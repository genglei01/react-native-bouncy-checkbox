import * as React from "react";
import {
  Animated,
  Easing,
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import styles, { _iconContainer, _textStyle } from "./BouncyCheckbox.style";

export interface ISource {
  source: string | { uri: string };
}

export interface IBouncyCheckboxProps {
  style?: any;
  size?: number;
  text?: string;
  iconStyle?: any;
  textStyle?: any;
  fillColor?: string;
  iconComponent?: any;
  isChecked?: boolean;
  unfillColor?: string;
  disableText?: boolean;
  ImageComponent?: any;
  iconImageStyle?: any;
  bounceEffect?: number;
  bounceFriction?: number;
  useNativeDriver?: boolean;
  textDecoration?: boolean;
  checkIconImageSource?: ISource;
  borderColor?: string;
  onPress: (isChecked: boolean) => void;
}

interface IState {
  checked: boolean;
  springValue: Animated.Value;
}

const defaultCheckImage = require("./check.png");

class BouncyCheckbox extends React.Component<
  IBouncyCheckboxProps & TouchableOpacityProps,
  IState
> {
  constructor(props: IBouncyCheckboxProps & TouchableOpacityProps) {
    super(props);
    this.state = {
      checked: false,
      springValue: new Animated.Value(1),
    };
  }

  componentDidMount() {
    this.setState({ checked: this.props.isChecked || false });
  }

  componentWillReceiveProps(nextProps: IBouncyCheckboxProps) {
    if (nextProps.isChecked !== this.props.isChecked) {
      this._onChanged(nextProps.isChecked || false);
    }
  }

  _onChanged = (
    isChecked: boolean,
    onPress: Function | undefined = undefined,
  ) => {
    const {
      useNativeDriver = true,
      bounceEffect = 1,
      bounceFriction = 3,
    } = this.props;

    const { springValue } = this.state;
    this.setState({ checked: isChecked }, () => {
      springValue.setValue(0.7);
      Animated.spring(springValue, {
        toValue: bounceEffect,
        friction: bounceFriction,
        useNativeDriver,
      }).start();
      onPress && onPress(this.state.checked);
    });
  };

  springBounceAnimation = () => {
    this._onChanged(!this.state.checked, this.props.onPress);
  };

  renderCheckIcon = () => {
    const { checked, springValue } = this.state;
    const {
      size = 25,
      iconStyle,
      iconComponent,
      iconImageStyle,
      fillColor = "#ffc484",
      ImageComponent = Image,
      unfillColor = "transparent",
      borderColor = "#ffc484",
      checkIconImageSource = defaultCheckImage,
    } = this.props;
    return (
      <Animated.View
        style={[
          { transform: [{ scale: springValue }] },
          _iconContainer(size, checked, fillColor, unfillColor, borderColor),
          iconStyle,
        ]}
      >
        {iconComponent ||
          (checked && (
            <ImageComponent
              source={checkIconImageSource}
              style={[styles.iconImageStyle, iconImageStyle]}
            />
          ))}
      </Animated.View>
    );
  };

  renderCheckboxText = () => {
    const {
      textStyle,
      text,
      disableText = false,
      textDecoration = false,
    } = this.props;
    return (
      !disableText && (
        <View style={styles.textContainer}>
          <Text
            style={[
              _textStyle(this.state.checked && textDecoration),
              textStyle,
            ]}
          >
            {text}
          </Text>
        </View>
      )
    );
  };

  render() {
    const { style } = this.props;
    return (
      <TouchableOpacity
        {...this.props}
        style={[styles.container, style]}
        onPress={this.springBounceAnimation.bind(this, Easing.bounce)}
      >
        {this.renderCheckIcon()}
        {this.renderCheckboxText()}
      </TouchableOpacity>
    );
  }
}

export default BouncyCheckbox;
