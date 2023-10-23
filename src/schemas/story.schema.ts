const StorySchema: object = {
  type: "object",
  properties: {
    type: {
      type: "string",
      errorMessage: {
        format: "Invalid type"
      }
    }
  },
  required: ["type"],
  additionalProperties: false
}

export default StorySchema;