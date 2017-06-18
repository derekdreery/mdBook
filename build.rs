// build.rs

use std::process::Command;
use std::env;
use std::path::Path;
#[macro_use]
extern crate error_chain;

#[cfg(windows)]
mod execs {
    pub const NPM: &'static str = "npm.cmd";
    pub const STYLUS: &'static str = "stylus.cmd";
}
#[cfg(not(windows))]
mod execs {
    pub const NPM: &'static str = "npm";
    pub const STYLUS: &'static str = "stylus";
}


error_chain!{
 foreign_links {
        Io(std::io::Error);
    }
}

fn program_exists(program: &str) -> Result<()> {
    Command::new(program)
        .arg("-v")
        .output()
        .chain_err(|| format!("Please install '{}'!", program))?;
    Ok(())
}

fn npm_package_exists(package: &str) -> Result<()> {
    let status = Command::new(execs::NPM)
        .args(&["list", "-g"])
        .arg(package)
        .output();

    match status {
        Ok(ref out) if out.status.success() => Ok(()),
        _ => {
            bail!("Missing npm package '{0}' \
                  install with: 'npm -g install {0}'",
                  package)
        },
    }
}

pub enum Resource<'a> {
    Program(&'a str),
    Package(&'a str),
}
use Resource::{Program, Package};

impl<'a> Resource<'a> {
    pub fn exists(&self) -> Result<()> {
        match *self {
            Program(name) => program_exists(name),
            Package(name) => npm_package_exists(name),
        }
    }
}

fn run() -> Result<()> {

    if let Ok(_) = env::var("CARGO_FEATURE_REGENERATE_CSS") {
        // Check dependencies
        Program(execs::NPM).exists()?;
        Program("node").exists().or(Program("nodejs").exists())?;
        Package("nib").exists()?;
        Package("stylus").exists()?;

        // Compile stylus stylesheet to css
        let manifest_dir = env::var("CARGO_MANIFEST_DIR")
            .chain_err(|| "Please run the script with: 'cargo build'!")?;
        let theme_dir = Path::new(&manifest_dir).join("src/theme/");
        let stylus_dir = theme_dir.join("stylus/book.styl");

        if !Command::new(execs::STYLUS)
                .arg(stylus_dir)
                .arg("--out")
                .arg(theme_dir)
                .arg("--use")
                .arg("nib")
                .status()?
                .success() {
            bail!("Stylus encoutered an error");
        }
    }
    Ok(())
}

quick_main!(run);
