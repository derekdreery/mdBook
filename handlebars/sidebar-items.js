initSidebarItems({"enum":[["TemplateError","Template parsing error"]],"struct":[["Context","The context wrap data you render on your templates."],["Handlebars",""],["Helper",""],["RenderContext","The context of a render callthis context stores information of a render and a writer where generated content is written to."],["RenderError",""],["Template",""]],"trait":[["HelperDef","Helper DefinitionImplement `HelperDef` to create custom helper. You can retrieve useful information from these arguments.&Context: the context you are rendering &Helper: current helper template information, contains name, params, hashes and nested template &Registry: the global registry, you can find templates by name from registry &mut RenderContext: you can store variables (starts with @) in render context, for example, @index of #each. By default, you can use bare function as helper definition because we have supported unboxed_closure. If you have stateful or configurable helper, you can create a struct to implement `HelperDef`."],["JsonRender",""],["JsonTruthy",""],["Renderable",""]]});