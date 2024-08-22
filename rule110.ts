type Tail<Lst extends Array<any>> = Lst extends [infer _, ...infer Rest]
  ? Rest
  : never;

var x: Tail<[1, 2, 3]> = [2, 3];

type Head<Lst extends Array<any>> = Lst extends [infer head, ...infer _]
  ? head
  : never;

var y: Head<["a", "b", "c"]> = "a";

type Cons<E, Lst extends Array<E>> = [E, ...Lst];

var z: Cons<1, [1, 1]> = [1, 1, 1];

type Reverse<
  Lst extends Array<any>,
  Acc extends Array<any> = []
> = Lst extends [] ? Acc : Reverse<Tail<Lst>, Cons<Lst[0], Acc>>;

var a: Reverse<[1, 2, 3]> = [3, 2, 1];

// 建立Rul110表
type Cell = 0 | 1;
type Rule110<X extends Cell, Y extends Cell, Z extends Cell> = {
  "000": 0;
  "001": 1;
  "010": 1;
  "011": 1;
  "100": 0;
  "101": 1;
  "110": 1;
  "111": 0;
}[`${X}${Y}${Z}`];

// 根据State生成下一个State，第一个元素不变
type NextState<State extends Array<Cell>> = State extends [
  infer X extends Cell,
  ...infer Reset extends Array<Cell>
]
  ? [X, ...Next<X, Reset>]
  : [];

type Next<X extends Cell, Lst extends Array<Cell>> = Lst extends [
  infer Y extends Cell,
  infer Z extends Cell,
  ...infer Rest extends Array<Cell>
]
  ? [Rule110<X, Y, Z>, ...Next<Y, [Z, ...Rest]>]
  : Lst extends [infer Y extends Cell]
  ? [Y]
  : [];

// 执行N次，返回包含N个State的数组
type GenNTime<N extends Array<any>, State extends Array<Cell>> = N extends []
  ? []
  : [State, ...GenNTime<Tail<N>, NextState<State>>];

type N = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
type InitState = [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0];

let k: GenNTime<N, InitState> = 69;
