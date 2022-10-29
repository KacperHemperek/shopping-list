import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import Checkbox from '../components/Checkbox';
import {
  FormButton,
  FormButtonGroup,
  FormCheckboxWrapper,
  FormLink,
  FormText,
  FormTitle,
  InputGroup,
} from '../styled/FormElements';
import { Input, Label, LabelWrapper } from '../styled/Input';
import { ScreenWrapper } from '../styled/ScreenWrapper';

import { EnvelopeIcon, LockClosedIcon } from 'react-native-heroicons/outline';
import { useTheme } from 'styled-components';
import useUser from '../hooks/useUser';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

const Login = () => {
  const { logIn } = useUser();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const navigation = useNavigation();

  async function handleLogIn() {
    try {
      await logIn(email, password);
    } catch (error) {
      Alert.alert(
        error.name,
        String(error.message).replace('AuthApiError: ', '')
      );
      setPassword('');
    }
  }

  return (
    <ScreenWrapper verticalCenter horizontalCenter>
      <InputGroup
        behavior={Platform.OS === 'ios' ? 'position' : null}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <FormTitle>Log In</FormTitle>
        <LabelWrapper>
          <EnvelopeIcon
            size={16}
            color={theme.colors.gray}
            style={{ marginTop: 2, marginRight: 6 }}
          />
          <Label>Email</Label>
        </LabelWrapper>
        <Input
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
        />
        <LabelWrapper>
          <LockClosedIcon
            size={16}
            color={theme.colors.gray}
            style={{ marginTop: 2, marginRight: 6 }}
          />
          <Label>Password</Label>
        </LabelWrapper>
        <Input
          keyboardType='default'
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <FormCheckboxWrapper>
          <Checkbox
            checked={showPassword}
            setChecked={() => setShowPassword((prev) => !prev)}
            label='show password'
          />
        </FormCheckboxWrapper>
      </InputGroup>
      <FormButtonGroup>
        <FormLink
          onPress={() => {
            navigation.navigate('SignUp' as never);
          }}
        >
          Don't have an account? Sign Up
        </FormLink>

        <FormButton onPress={handleLogIn}>
          <FormText>Log In</FormText>
        </FormButton>
      </FormButtonGroup>
    </ScreenWrapper>
  );
};

export default Login;
