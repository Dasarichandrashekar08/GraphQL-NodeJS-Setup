import graphqlFields from "graphql-fields";

export const getAttributes = (info, model, fieldName = null) => {
  const modelAttributes = Object.keys(model.rawAttributes);
  let fields;
  if (fieldName) {
    fields = graphqlFields(info)[fieldName];
  } else {
    fields = graphqlFields(info);
  }
  return Object.keys(fields).filter(
    (field) => modelAttributes.indexOf(field) >= 0
  );
};