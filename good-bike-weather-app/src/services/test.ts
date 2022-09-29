// code in this folder should be called only on server
// (not from any page or component, only by /api/* files)

export const doSomething = (arg: number) => {
  // do some logic
  return {
    numbers: [arg, arg],
  }
}
