import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Checkbox = ({
    checked,
    setChecked,
    label,
    style = {},
    textDecoration = false,
    disableBuiltInState = false,
    removeAnimation = false,
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
            disableBuiltInState={disableBuiltInState}
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
            bounceVelocityIn={removeAnimation ? 0 : 0.1}
            bounceVelocityOut={removeAnimation ? 0 : 0.4}
            bouncinessIn={removeAnimation ? 0 : 20}
            bounceEffectIn={removeAnimation ? 1 : 0.9}
            bouncinessOut={removeAnimation ? 0 : 20}
        />
    );
};

export default Checkbox;
