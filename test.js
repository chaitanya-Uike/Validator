(function anonymous(self, scope) {
  const schema11 = scope.schema[6];
  return function validate10(
    data,
    { instancePath = "", parentData, parentDataProperty, rootData = data } = {}
  ) {
    let vErrors = null;
    let errors = 0;
    const _errs0 = errors;
    if (typeof data == "number" && isFinite(data)) {
      if (data < 3 || isNaN(data)) {
        validate10.errors = [
          {
            instancePath,
            schemaPath: "#/allOf/0/minimum",
            keyword: "minimum",
            params: {
              comparison: ">=",
              limit: 3,
            },
            message: "must be >= 3",
          },
        ];
        return false;
      }
    }
    var valid0 = _errs0 === errors;
    if (valid0) {
      const _errs1 = errors;
      if (typeof data == "number" && isFinite(data)) {
        if (data < 6 || isNaN(data)) {
          validate10.errors = [
            {
              instancePath,
              schemaPath: "#/allOf/1/minimum",
              keyword: "minimum",
              params: {
                comparison: ">=",
                limit: 6,
              },
              message: "must be >= 6",
            },
          ];
          return false;
        }
      }
      var valid0 = _errs1 === errors;
    }
    if (errors === 0) {
      if (typeof data == "number" && isFinite(data)) {
        if (data > 10 || isNaN(data)) {
          validate10.errors = [
            {
              instancePath,
              schemaPath: "#/maximum",
              keyword: "maximum",
              params: {
                comparison: "<=",
                limit: 10,
              },
              message: "must be <= 10",
            },
          ];
          return false;
        } else {
          if (data < 2 || isNaN(data)) {
            validate10.errors = [
              {
                instancePath,
                schemaPath: "#/minimum",
                keyword: "minimum",
                params: {
                  comparison: ">=",
                  limit: 2,
                },
                message: "must be >= 2",
              },
            ];
            return false;
          }
        }
      }
    }
    validate10.errors = vErrors;
    return errors === 0;
  };
});
