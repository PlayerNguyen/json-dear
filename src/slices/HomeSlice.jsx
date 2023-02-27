import { createSlice } from "@reduxjs/toolkit";

const _initial = [
  {
    id: "1",
    value: [1, 2, 3],
  },
  {
    id: "2",
    value: [
      {
        name: "Kepler",
        isMonster: false,
        damage: 1.256,
        weapon: [
          {
            name: "knife",
            damage: 12.85,
            throwable: true,
            projectile: false,
          },
          {
            name: "gun",
            damage: 30.23,
            throwable: false,
            projectile: true,
          },
        ],
      },
      {
        name: "Jupiter",
        isMonster: false,
        damage: 3e12,
      },
    ],
  },
];
const initialState = {
  tree: _initial,
  rawTree: JSON.stringify(_initial, null, 2),
  error: undefined,
};

const HomeSlice = createSlice({
  name: "Home",
  initialState,
  reducers: {
    setTree: (state, action) => {
      state.tree = action.payload;
    },
    setRawTree: (state, action) => {
      state.rawTree = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTree, setError, setRawTree } = HomeSlice.actions;

export default HomeSlice.reducer;
