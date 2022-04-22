import ReactCountryFlag from 'react-country-flag';
import './User.css';

function User(props) {
  return (

    <tr>
        <td>{props.user.rank}</td>
        <td>
            <div className='UserInfo'>
                <img className='Avatar' src={props.user.avatar_url || "https://icon-library.com/images/anonymous-person-icon/anonymous-person-icon-18.jpg"} alt="ProfilePic" />
                <p>{props.user.username}</p>
            </div>
        </td>
        <td>{props.user.money}</td>
        <td>        
            <ReactCountryFlag
                countryCode={props.user.country}
                svg
                style={{
                    width: '2em',
                    height: '2em',
                    borderRadius: '0.5em',
                }}
                title={props.user.country}
                
            />
            </td>
        <td className={props.user.status}>
            {props.user.status === 'incrased' ? '+' : ''}
            {props.user.status === 'decrased' ? props.user.diff * -1 : props.user.diff}
        </td>
    </tr>

  );
}

export default User;
