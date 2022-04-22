import './App.css';
import User from './Components/User';
import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';

function App() {
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = window.location.pathname.length !== 1 ? window.location.pathname.substring(1) : "Weekly"
    document.title = `${document.title} | Leaderboard`
    console.log(window.location.pathname);
  }, []);

  useEffect(() => {
    const path = + window.location.pathname.length !== 1 ? window.location.pathname : ""
    fetch(`https://panteonleaderboard.herokuapp.com/api/v1/user/List${path}`)
    .then((res) => res.json())
    .then((json) => {
      setUsers(json);
      setLoading(false)
    }).catch(err => {
      console.log(err)
      setLoading(false)
    });
  }, [])

  return (
    <div className="App">
    {
      loading ? (
        <div style={
          {
            display: 'flex',
            height: '90vh',
            justifyContent: 'center',
            alignItems: 'center',
          }
        }> 
            <ReactLoading type={'spinningBubbles'} color={'black'} height={'10%'} width={'10%'} />
        </div>
        ) : (
        <div>
          <h1>Leaderboard</h1>

          <table className="Leaderboard">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Money</th>
                <th>Country</th>
                <th>Diff</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                  <User key={index} user={{
                    rank: user.rank.rank,
                    username: user.username,
                    money: "$" + user.rank.score,
                    avatar_url: user.avatarUrl,
                    country: user.country,
                    diff: Math.abs(user.rank.rank - user.rank.prevRank),
                    status: user.rank.rank < user.rank.prevRank ? 'incrased' : user.rank.rank > user.rank.prevRank ? 'decrased' : 'same'
                  }}></User>
              ))}
            </tbody>
          </table>
          {
              !users || users.length === 0 ? (
                <div>
                  <h2>No users found</h2>
                </div>
              ) : ("")
          }
        </div>
      )
    }
    </div>
   
  );
}

export default App;
