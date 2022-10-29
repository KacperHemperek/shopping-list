import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { Input, Label, LabelWrapper } from '../styled/Input';
import { ScreenWrapper } from '../styled/ScreenWrapper';
import {
  FormButton,
  FormButtonGroup,
  FormCheckboxWrapper,
  FormLink,
  FormText,
  FormTitle,
  InputGroup,
} from '../styled/FormElements';
import { useNavigation } from '@react-navigation/native';
import Checkbox from '../components/Checkbox';
import {
  LockClosedIcon,
  EnvelopeIcon,
  UserIcon,
} from 'react-native-heroicons/outline';
import { useTheme } from 'styled-components';
import useUser from '../hooks/useUser';

const Signup = () => {
  const { signUp } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [name, setName] = useState('');

  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(null);

  const navigation = useNavigation();

  async function handleLogIn() {
    try {
      await signUp(email, password, confirm, name);
    } catch (error) {
      Alert.alert(error.name, error.message.replace('AuthApiError: ', ''));
      setPassword('');
      setConfirm('');
    }
  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 20 : 0;
  return (
    <ScreenWrapper verticalCenter horizontalCenter>
      <InputGroup
        behavior={Platform.OS === 'ios' ? 'position' : ''}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <FormTitle>Sign Up</FormTitle>
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
          <UserIcon
            size={16}
            color={theme.colors.gray}
            style={{ marginTop: 2, marginRight: 6 }}
          />
          <Label>Username</Label>
        </LabelWrapper>
        <Input
          keyboardType='email-address'
          value={name}
          onChangeText={setName}
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
        <LabelWrapper>
          <LockClosedIcon
            size={16}
            color={theme.colors.gray}
            style={{ marginTop: 2, marginRight: 6 }}
          />
          <Label>Confirm password</Label>
        </LabelWrapper>
        <Input
          keyboardType='default'
          secureTextEntry={!showPassword}
          value={confirm}
          onChangeText={setConfirm}
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
        <FormLink onPress={() => navigation.navigate('LogIn' as never)}>
          Already have an account? Log in!
        </FormLink>
        <FormButton onPress={handleLogIn}>
          <FormText>Sign Up</FormText>
        </FormButton>
      </FormButtonGroup>
    </ScreenWrapper>
  );
};

export default Signup;
