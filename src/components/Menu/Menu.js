import React from 'react';
import {Menu } from 'semantic-ui-react'
import {NavLink} from "react-router-dom"

 export const MenuBarre=()=> {
    return(
        <Menu>
        <Menu.Item
          as={NavLink} exact to="/"
        >
          Accueil
        </Menu.Item>
        <Menu.Item
          as={NavLink} exact to="/buy"
        >
          Achat
        </Menu.Item>
        <Menu.Item
          as={NavLink} exact to="/sell"
        >
          Vente
        </Menu.Item>
        <Menu.Item
          as={NavLink} exact to="/play"
        >
          Jouer
        </Menu.Item>
        </Menu>
    )};

export default MenuBarre;