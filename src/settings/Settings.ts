import { InjectionKey, Ref } from "vue";
import { Tuning, Tunings } from "../theory/Tunings";

export type DisplayOption = "Name" | "Number" | "";

export const DisplayOptions: DisplayOption[] = ["Name", "Number", ""];

export interface Settings {
  tuning: Tuning;
  display: DisplayOption;
  frets: number;
}

export const DefaultSettings: Settings = {
  tuning: Tunings[0],
  display: "Number",
  frets: 15,
};

export const settingsSymbol = Symbol() as InjectionKey<Ref<Settings>>;
