import React,{ useState } from 'react';
import { tabsList } from '../../config/tabs';
import SelectTab from '../SelectTab/SelectTab';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp'
import './AuthModal.css';

const AuthModal = ({ handleClose, show  }) => {

  const [selectedTab, setSelectedTab] = useState(0);

  const showHideClassName = show ? 'display-block' : 'display-none';
  console.log(show);

  return (
      <div className={showHideClassName}>
        <div id="myModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <div className="tab-list">
                {tabsList.map(tab=>(
                  <SelectTab
                    key={tab.value}
                    onClick={() => setSelectedTab(tab.value)}
                    selected={tab.value === selectedTab}>
                    {tab.label}
                  </SelectTab>
                ))}
                <div className="close" onClick={handleClose}>×</div>
              </div>
            </div>
            <div className="modal-body">
              {selectedTab===0&& <Login handleClose={handleClose} />}
              {selectedTab===1&& <SignUp handleClose={handleClose} />}
            </div>
          </div>
        </div>
      </div>
    )
  }

export default AuthModal;