// menuReducer.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuState {
  selectedMenu: string | null;
  selectedSubMenu: string | null;
  selectedMenuId: number | null;
  selectedSubMenuId: number | null;
  selectedExpand: string | null;
}

const initialState: MenuState = {
  selectedMenu: 'Dashboard',
  selectedSubMenu: 'Main Dashboard',
  selectedMenuId: 1,
  selectedSubMenuId: 11,
  selectedExpand: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    selectMenu(state, action: PayloadAction<any>) {
      state.selectedMenu = action.payload.menu;
      state.selectedSubMenu = action.payload.subMenu;
      state.selectedMenuId = action.payload.menuId;
      state.selectedSubMenuId = action.payload.subMenuId;
    },
    setExpandedMenu: (state, action: PayloadAction<string | null>) => {
      state.selectedExpand = action.payload;
    },
  },
});

export const { selectMenu, setExpandedMenu } = menuSlice.actions;

export const selectedMenu = (state: any) => state.menu.selectedMenu;
export const selectedSubMenu = (state: any) => state.menu.selectedSubMenu;
export const selectedMenuId = (state: any) => state.menu.selectedMenuId;
export const selectedSubMenuId = (state: any) => state.menu.selectedSubMenuId;
export const selectedExpanded = (state: any) => state.menu.selectedExpand;

export default menuSlice.reducer;
