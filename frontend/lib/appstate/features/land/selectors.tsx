import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";

export const selectLand = (state: RootState) => state.Land;

export const LandSelector = createSelector(selectLand, (state) => state);
