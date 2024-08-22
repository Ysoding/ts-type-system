import { Eval } from "./node_modules/typelang/src";

// type Result = Eval<"">;
type Result = Eval<"123">;

var x: Result = "123";

interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}

let a = createLabel("typescript");

// let a: NameLabel;
//
// let b = createLabel(2.8);

// let b: IdLabel;

// let c = createLabel(Math.random() ? "hello" : 42);

type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Email {
  message: string;
}

interface Dog {
  bark(): void;
}

type EmailMessageContents = MessageOf<Email>;

type DogMessageContents = MessageOf<Dog>;

// type Flatten<T> = T extends any[] ? T[number] : T;

type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

type Str = Flatten<string[]>;

type Num = Flatten<number>;
