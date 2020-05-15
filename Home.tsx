import React, { useEffect,useState } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, TextInput, Button} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Actions from './actions';
import Selectors from './selectors';
import { State, UserState } from './types';
import theme from './theme';

interface HomeProps {
  users: UserState;
  fetchUsers: () => void;
  incrementUser: ()=> void; 
  decrementUser: ()=> void;
}

export const Home = React.memo(({ 
  users, fetchUsers, incrementUser,decrementUser}: HomeProps): React.ReactElement => {
  useEffect(() => {
    fetchUsers();
    incrementUser();
    decrementUser();
  }, []);

  const [value, onChangeText] = React.useState('Reply');
  const commentatorPost = value !== 'Reply' ? value : '';
  const user = users.list[users['userIndex']];
  const next = () => {incrementUser()};
  const prev = () => {decrementUser()};

  if (!users.list.length) {
    return null;
  }
  return (
    <Container>
      <TopBar>
        <Column>
          <H1>{user.name}</H1>
          <S1>{user.website}</S1>
        </Column>
        <Column>
          <Row>
            <TouchableOpacity onPress={prev}>
              <ArrowIcon name="md-arrow-back" size={32} color={theme.colors.accent} />
            </TouchableOpacity>
            <TouchableOpacity onPress={next}>
              <ArrowIcon name="md-arrow-forward" size={32} color={theme.colors.accent} />
            </TouchableOpacity>
          </Row>
        </Column>
      </TopBar>
      <Column>
      <BottomContainer>
        <PostHeader>{`${user.name}'s Top Health Tips`}</PostHeader>
        <UserPosts>{user.company.bs}</UserPosts>
        <UserPosts>{user.company.catchPhrase}</UserPosts>
        <CommentatorPosts>{value}</CommentatorPosts>
        <Input
          onChangeText={text => onChangeText(text)}
          value={value}
        />
        <Button
          onPress={()=>{
            alert(`Great! You have successfully posted "${value}"`);
        }}
          title="Submit"
          color="#df6185"
          accessibilityLabel="Learn more about this pink button"
        />
      </BottomContainer>
        </Column>
    </Container>
  )
});

export default connect(
  (state: State) => ({
   users:Selectors.users(state),
  }),
  dispatch => ({
  fetchUsers: () => dispatch(Actions.users.fetchUsers.trigger()),
  incrementUser: () => dispatch({type:'INCREMENT_USER'}),
  decrementUser: () => dispatch({type:'DECREMENT_USER'}),
  }),
)(Home);

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const TopBar = styled.View`
  width: 100%;
  padding: ${({ theme }) => theme.space.lg}px;
  background-color: ${({ theme }) => theme.colors.contentBg};
  justify-content: space-between;
  flex-direction: row;
`

const BottomContainer = styled.View`
  width: 100%;
  padding: ${({ theme }) => theme.space.lg}px;
  background-color: ${({ theme }) => theme.colors.white};
  justify-content: center;
  flex-direction: column;
`
const Input= styled.TextInput`
height: 40px;
borderColor: ${({ theme }) => theme.colors.accent};
padding: ${({ theme }) => theme.space.sm}px;
paddingLeft: ${({ theme }) => theme.space.md}px;
borderWidth: 3px;
`
const Column = styled.View`
`;

const Row = styled.View`
  flex-direction: row;
`

const ArrowIcon = styled(Ionicons)`
  margin: 0 ${({ theme }) => theme.space.md}px;
`

const H1 = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.basic};
`
const S1 = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.basic200};
`
const PostHeader= styled.Text`
font-size: 24px;
color: ${({ theme }) => theme.colors.accent};
paddingBottom: ${({ theme }) => theme.space.md}px;

`
const UserPosts =  styled.Text`
font-size: 16px;
color: ${({ theme }) => theme.colors.basic};
paddingLeft: ${({ theme }) => theme.space.sm}px;
paddingBottom:${({ theme }) => theme.space.md}px;
`
const CommentatorPosts=  styled.Text`
font-size: 16px;
color: ${({ theme }) => theme.colors.basic};
paddingLeft: ${({ theme }) => theme.space.sm}px;
paddingBottom:${({ theme }) => theme.space.md}px;
`