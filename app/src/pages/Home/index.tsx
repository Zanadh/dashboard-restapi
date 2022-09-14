import useTypedSelector from '../../hooks/useTypedSelector';

const Home = () => {
  const sessions = useTypedSelector((state) => state.sessions);
  return (
    <div>
      <h3 style={{ marginBottom: 24 }}>Hi {sessions.name || sessions.email} !</h3>
      <h4>This is just a simple dashboard app with permission/role implemented.</h4>
      <h4>
        By default, the user is granted all available permissions. That includes the access to User
        page.
      </h4>
      <h4>
        <b>User Page</b> is the page where you can set users permission, including yourself and
        other user
      </h4>
    </div>
  );
};

export default Home;
