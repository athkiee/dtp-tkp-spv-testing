import React, { Component } from "react";


export default class Tablerow extends Component {
    changeHandler = (value, id) => {
    if (value) {
      this.props.onSelect(id);
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