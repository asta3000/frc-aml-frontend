import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as MenuAction from "../../reduxes/actions/Menu";
import * as LocalAction from "../../reduxes/actions/Local";

import styles from "./styles.module.css";

function Menu(props) {
  useEffect(() => {
    props.getMenus(props.module.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.module.id]);

  const handleMenu = (detail) => {
    props.storeMenu(
      detail.ID,
      detail.MODULE_ID,
      detail.NAME,
      props.module.name
    );
  };

  return (
    <div className={styles.menu}>
      <p className={styles.title}>{props.module.name}</p>
      <div className={styles.container}>
        {props.menus?.map((menu, index) => {
          return (
            <Link
              to="/"
              className={styles.menu_list}
              key={index}
              onClick={() => handleMenu(menu)}
            >
              {menu.NAME}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    menus: state.MenuReducer.menus,
    module: state.LocalReducer.module,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMenus: (module_id) => dispatch(MenuAction.getMenus(module_id)),
    storeMenu: (menu_id, module_id, menu_name, module_name) =>
      dispatch(
        LocalAction.storeMenu(menu_id, module_id, menu_name, module_name)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
