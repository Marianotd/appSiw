import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { sessionSlice } from './SessionSlice';

export const useAppStore = create(devtools((set, get, api) => ({
  ...sessionSlice(set, get, api),
})));
