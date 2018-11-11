/**
 * 認証
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 */
export const auth = (event, context, callback) => {
  event.response = {
    id: "testID"
  };
  console.log(JSON.stringify(event));
  context.done(error, event);
};
