import type { BirthInterface } from '#root/common/ports/Birth.js';

export interface TerminalInterface {
  id: number;
  name: string;
  births: BirthInterface[];
  // color: Color;
  // region: number[];
}
