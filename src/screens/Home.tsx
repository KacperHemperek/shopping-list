import { Modal, Platform, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { ScreenWrapper } from '../styled/ScreenWrapper';
import { MyText } from '../styled/MyText';
import styled, { useTheme } from 'styled-components/native';
import { SafeArea } from '../styled/SafeArea';
import { Input, Label, LabelWrapper } from '../styled/Input';
import { BellAlertIcon, PlusSmallIcon } from 'react-native-heroicons/solid';
import { Header, HeaderTitle } from '../styled/Header';
import useLists from '../hooks/useFetchLists';
import { ListWrapper } from '../styled/ListWrapper';
import ListCard from '../components/ListCard';
import LoadingScreen from './LoadingScreen';
import {
  ArrowRightOnRectangleIcon,
  UsersIcon,
  TrashIcon,
} from 'react-native-heroicons/solid';
import { FolderArrowDownIcon } from 'react-native-heroicons/outline';
import Popup from '../components/Popup';
import useUpdateLists from '../hooks/useUpdateLists';
import AddUser from '../components/AddUser';
import { shadow } from '../helpers/Shadow';
import Notification from '../components/Notification';
import useUser from '../hooks/useUser';
import { InviteState } from '../interface/InviteState';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 0;

const Home = () => {
  const { userLists, error } = useLists();
  const { logOut, currentUser } = useUser();
  const { createList, changeList, deleteList } = useUpdateLists();
  const theme = useTheme();
  const [listName, setListName] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [currentEditList, setCurrentEditList] = useState(null);
  const [editName, setEditName] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  function renderList() {
    return userLists?.map((item, index) => {
      return (
        (
          <ListCard
            key={item.name + index}
            id={item.id}
            name={item.name}
            creator={item.creator.username}
            onEdit={() => {
              setCurrentEditList(item);
              setEditName(item.name);
              setShowEdit(true);
            }}
          />
        ) ?? null
      );
    });
  }

  if (!error && !userLists) {
    return <LoadingScreen />;
  }

  return (
    <ScreenWrapper horizontalCenter>
      <SafeArea>
        <Header justifyBetween>
          <HeaderTitle>Your Lists</HeaderTitle>
          <ButtonWrapper>
            <NavButton
              type={'neutral'}
              onPress={() => {
                setNotificationsOpen(true);
              }}
              style={{
                marginRight: 16,
              }}
            >
              <BellAlertIcon size={24} color={theme.colors.text} />
            </NavButton>
            <Modal transparent visible={notificationsOpen} animationType='fade'>
              <NotificationBackground
                activeOpacity={1}
                onPress={() => setNotificationsOpen(false)}
              >
                <NotificationsContainer style={shadow}>
                  <ScrollView style={{ flex: 1 }}>
                    <View onStartShouldSetResponder={() => true}>
                      <Notification
                        listName={'New List'}
                        userName={'Kacper H'}
                        state={InviteState.accepted}
                        seen={true}
                        createdAt={new Date()}
                        listId={'45ffe88f-7e48-4c26-a23a-0739bb01ec55'}
                      />
                    </View>
                  </ScrollView>
                </NotificationsContainer>
              </NotificationBackground>
            </Modal>
            <NavButton style={{ marginBottom: 4 }} onPress={logOut}>
              <ArrowRightOnRectangleIcon size={24} color={theme.colors.text} />
            </NavButton>
          </ButtonWrapper>
        </Header>
        <ListWrapper>{renderList()}</ListWrapper>
        <NewListWrapper
          behavior={Platform.OS === 'ios' ? 'position' : null}
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <InputWrapper>
            <NewListInput
              style={shadow}
              placeholder='new list name'
              onChangeText={setListName}
              value={listName}
            />
            <Button
              style={shadow}
              onPress={() => {
                createList(listName);
                setListName('');
              }}
            >
              <PlusSmallIcon color='#E7F6F2' size={24} fontWeight={800} />
            </Button>
          </InputWrapper>
        </NewListWrapper>
      </SafeArea>
      <Popup showModal={showEdit} hideModal={() => setShowEdit(false)}>
        <HeaderInput value={editName} onChangeText={setEditName} />
        {currentEditList?.creator.id === currentUser?.id && (
          <>
            <LabelWrapper>
              <UsersIcon
                size={16}
                color={theme.colors.gray}
                style={{ marginTop: 1, marginRight: 4 }}
              />
              <Label>Add new users</Label>
            </LabelWrapper>
            <AddUser list={currentEditList} />
          </>
        )}
        <ListWrapper></ListWrapper>

        <ButtonWrapper>
          <SubmitButton
            onPress={async () => {
              try {
                await changeList(editName, currentEditList.id);
                setShowEdit(false);
              } catch (error) {
                console.error(error);
              }
            }}
          >
            <FolderArrowDownIcon
              style={{ marginRight: 6 }}
              color='#E7F6F2'
              size={20}
            />

            <MyText>Save</MyText>
          </SubmitButton>
          <SubmitButton
            onPress={async () => {
              try {
                await deleteList(currentEditList);
                setShowEdit(false);
              } catch (error) {
                console.error(error);
              }
            }}
            type='delete'
          >
            <TrashIcon style={{ marginRight: 6 }} color='#E7F6F2' size={20} />

            <MyText>Delete</MyText>
          </SubmitButton>
        </ButtonWrapper>
      </Popup>
    </ScreenWrapper>
  );
};

const NotificationsContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.darkBlue};
  top: ${(props) => (Platform.OS === 'android' ? '70px' : '120px')};
  right: 20px;
  position: absolute;
  width: 85%;
  border-radius: 16px;
  max-height: 500px;
  min-height: 100px;
  padding: 8px 0px;
  z-index: 50;
  border: 1px solid ${({ theme }) => theme.colors.gray};
`;

const NotificationBackground = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  flex: 1;
  position: relative;
`;

const ButtonWrapper = styled.View`
  position: relative;
  align-items: center;
  flex-direction: row;
`;

const HeaderInput = styled.TextInput`
  color: ${(props) => props.theme.colors.text};
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 24px;
  width: 100%;
`;

const SubmitButton = styled.TouchableOpacity<{ type?: 'delete' }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.type === 'delete' ? props.theme.colors.red : props.theme.colors.blue};
  padding: 8px;
  margin-right: 16px;
  border-radius: 4px;
  width: 90px;
`;

enum NavButtonType {
  neutral = 'neutral',
  transparent = 'transparent',
}

const NavButton = styled.TouchableOpacity<{ type: NavButtonType }>`
  padding: 8px;
  background-color: ${({ theme, type }) =>
    type === 'neutral' ? 'transparent' : theme.colors.blue};
  border-radius: 100px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.lightBlue};
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 400px;
  margin-left: 16px;
`;

const NewListInput = styled(Input)`
  flex: 1;
  margin-bottom: 0;
  height: 50px;
`;

const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const NewListWrapper = styled.KeyboardAvoidingView`
  padding: 0 16px 32px 16px;
  width: 100%;
  justify-items: center;
  position: absolute;
  bottom: 0;
`;

export default Home;
