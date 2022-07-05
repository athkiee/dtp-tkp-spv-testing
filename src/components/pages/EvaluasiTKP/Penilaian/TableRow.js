import React, { Component } from "react";


export default class Tablerow extends Component {
    changeHandler = (value, id) => {
    console.log("ValueTab: ", value);
    console.log("Idtab: ", id);
    if (value) {
      this.props.onSelect(id);
    } else {
      // handle de-select
    }
  };

  render() {
    const { rowData, selectedId } = this.props;
    const { id, name } = rowData;
    const isChecked = id === selectedId;

    return (
      <td style={{padding: 10}}>
        <td style={{paddingRight: 4}}>
          <input
            id={`checkbox_${id}`}
            checked={isChecked}
            onChange={e => this.changeHandler(e.target.checked, id)}
            type="checkbox"
            name="record"
          />
        </td>
        <td>{name}</td>
      </td>
    );
  }
}