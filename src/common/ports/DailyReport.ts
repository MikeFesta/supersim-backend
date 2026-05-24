import type { SequelizeTable } from '#root/common/Sequelize.js';
export interface TerminalDataInterface {
  vessels: number;
  imports: number;
  exports: number;
}

export interface PortTerminalsDataInterface {
  nsft: TerminalDataInterface;
  nsict: TerminalDataInterface;
  nsigt: TerminalDataInterface;
  apmt: TerminalDataInterface;
  bmct: TerminalDataInterface;
  nsdt: TerminalDataInterface;
}

export interface DailyReportInterface {
  date: Date;
  day: PortTerminalsDataInterface | null;
  month: PortTerminalsDataInterface | null;
  year: PortTerminalsDataInterface | null;
}
