## todolist

The webpart will show todo items from either a mock data store or sharepoint.

### Building the code

```bash
git clone https://github.com/sebastiantegel/spfxtodo.git
npm i
gulp serve
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.
