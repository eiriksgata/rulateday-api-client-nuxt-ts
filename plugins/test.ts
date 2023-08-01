
export default defineNuxtPlugin(() => {
  return {
    provide: {
      message: () => {
        return "asd";
      }
    },
  };
});
