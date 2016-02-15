initSidebarItems({"mod":[["epoll",""],["ioctl","Provide helpers for making ioctl system callsCurrently supports Linux on all architectures. Other platforms welcome!This library is pretty low-level and messy. `ioctl` is not fun.What is an `ioctl`?The `ioctl` syscall is the grab-bag syscall on POSIX systems. Don't want to add a new syscall? Make it an `ioctl`! `ioctl` refers to both the syscall, and the commands that can be send with it. `ioctl` stands for \"IO control\", and the commands are always sent to a file descriptor.It is common to see `ioctl`s used for the following purposes:Provide read/write access to out-of-band data related to a device such as configuration (for instance, setting serial port options) Provide a mechanism for performing full-duplex data transfers (for instance, xfer on SPI devices). Provide access to control functions on a device (for example, on Linux you can send commands like pause, resume, and eject to the CDROM device. Do whatever else the device driver creator thought made most sense. `ioctl`s are synchronous system calls and are similar to read and write calls in that regard.What does this module support?This library provides the `ioctl!` macro, for binding `ioctl`s. Here's a few examples of how that can work for SPI under Linux from rust-spidev.Spidev uses the `_IOC` macros that are encouraged (as far as `ioctl` can be encouraged at all) for newer drivers.  Many drivers, however, just use magic numbers with no attached semantics.  For those, the `ioctl!(bad ...)` variant should be used (the \"bad\" terminology is from the Linux kernel).How do I get the magic numbers?For Linux, look at your system's headers. For example, `/usr/include/linxu/input.h` has a lot of lines defining macros which use `_IOR`, `_IOW`, `_IOC`, and `_IORW`.  These macros correspond to the `ior!`, `iow!`, `ioc!`, and `iorw!` macros defined in this crate. Additionally, there is the `ioctl!` macro for creating a wrapper around `ioctl` that is somewhat more type-safe.Most `ioctl`s have no or little documentation. You'll need to scrounge through the source to figure out what they do and how they should be used."],["memfd",""],["mman",""],["ptrace",""],["quota",""],["select",""],["signal",""],["socket","Socket interface functionsFurther reading"],["stat",""],["statfs",""],["statvfs","FFI for statvfs functionsSee the `vfs::Statvfs` struct for some rusty wrappers"],["syscall","Indirect system call"],["termios",""],["time",""],["uio",""],["utsname",""],["wait",""]]});