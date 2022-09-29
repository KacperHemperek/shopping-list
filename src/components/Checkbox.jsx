import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Checkbox = ({
    checked,
    setChecked,
    label,
    style = {},
    textDecoration = false,
}) => {
    const textStyle = textDecoration
        ? {
              color: "#E7F6F2",
          }
        : {
              color: "#E7F6F2",
              textDecorationLine: "none",
          };
    return (
        <BouncyCheckbox
            style={style}
            isChecked={checked}
            onPress={setChecked}
            text={label}
            textStyle={textStyle}
            fillColor="#395B64"
            innerIconStyle={{
                borderRadius: 4,
            }}
            iconStyle={{
                borderRadius: 4,
            }}
        />
    );
};

export default Checkbox;
