# The "Request Aware" middleware.

Some middleware (such as the "static" middleware included in this package) do not keep any kind of state variables that
can be exposed between requests.  For many use cases, you may want to isolate part of the conversation (such as query
variables) for each request while using common variables and options between requests.

## `fluid.express.middleware.requestAware`

Middleware that creates a [`fluid.express.handler`](handler.md) instance for each request and allows that to process the
request.

### Component Options

In addition to the options allowed for every [`fluid.express.middleware`](middleware.md) instance, this component has the
following unique options:

| Option          | Type      | Description |
| --------------- | --------- | ----------- |
| `handlerGrades` | `{Array}` | An array of grades that will be used to create our handler. An error will be thrown if there are no handlers, matching a request, so you must at least supply a default handler. |

### Passing Options to the Dynamic Handler Component

If you would like to pass in additional options to the `fluid.express.handler` grade, add an option like the following:

```snippet
dynamicComponents: {
    requestHandler: {
        options: {
            custom: "value"
        }
    }
}
```

Options that already exist when the component is created will be merged with the defaults as expected.  This approach
will not work for dynamic values such as model or member variables.

For dynamic values, you will need to use an IoC reference from within your `handler` grade's definition, as in:

```javascript
fluid.defaults("my.handler", {
    gradeNames: ["fluid.express.handler"],
    foo: "{fluid.express.middleware.requestAware}.foo"
});
```
