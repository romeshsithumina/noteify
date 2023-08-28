// function allows to pass any type to it, check typs is not null
export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (!val) {
    throw Error("Expected 'val' to be defined, but received " + val);
  }
}
