import { useEffect, useState } from "react";
import PlayList from "./playlist/PlayList";

function Profile({ userId }) {
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState(""); // default user icon
  const [recentPlays, setRecentPlays] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newProfileImage, setNewProfileImage] = useState("");
  const [defaultImages, setDefaultImages] = useState([]);

  // check recently played music and profile
  useEffect(() => {
    const storedRecentPlays = JSON.parse(localStorage.getItem("recentPlays")) || [];
    setRecentPlays(storedRecentPlays);

    fetch("/profileImages.json")
      .then((response) => response.json())
      .then((data) => {
        setDefaultImages(data.defaultImages);
        const savedProfileImage = localStorage.getItem("profileImage");
        if (savedProfileImage) {
          setProfileImage(savedProfileImage);
        } else {
          setProfileImage(data.defaultImages[0]); // Set default if none saved
        }
      })
      .catch((error) => {
        console.error("Error loading profile images:", error);
      });
  }, []);

  // update user info
  useEffect(() => {
    if (userId) {
      const users = JSON.parse(localStorage.getItem("users"));
      if (users && Array.isArray(users)) {
        const loggedInUser = users.find(user => String(user.id) === String(userId));
        if (loggedInUser) {
          setUserName(loggedInUser.name || "Default User");
          const savedProfileImage = loggedInUser.profileImage || "/default-profile.png";
          setProfileImage(savedProfileImage);
          setNewUserName(loggedInUser.name || "Default User");
          setNewProfileImage(savedProfileImage);
        }
      }
    } else {
      // load user info from storage
      const storedUserName = localStorage.getItem("userName");
      const storedProfileImage = localStorage.getItem("profileImage");
      if (storedUserName) {
        setUserName(storedUserName);
        setNewUserName(storedUserName);
      }
      if (storedProfileImage) {
        setProfileImage(storedProfileImage);
      }
    }
  }, [userId]);

  const handleSaveClick = () => {
    // update user info
    const users = JSON.parse(localStorage.getItem("users"));
    if (users && users.length > 0) {
      const updatedUsers = users.map(user =>
        user.id === userId ? { ...user, name: newUserName, profileImage: newProfileImage } : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    const loggedInUser = { id: userId, name: newUserName, profileImage: newProfileImage };
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    // store
    localStorage.setItem("userName", newUserName);

    // store
    localStorage.setItem("profileImage", newProfileImage);

    // update
    setUserName(newUserName);
    setProfileImage(newProfileImage);
    setIsModalOpen(false);
  };

  const handleCancelClick = () => {
    setNewUserName(userName);
    setNewProfileImage(profileImage);
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setNewProfileImage(base64Image);
        localStorage.setItem("profileImage", base64Image);  // store image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="prof-head">
        <h1 className="prof-t">Profile</h1>
        <button className="edit-profile" onClick={() => setIsModalOpen(true)}>
          <i className="fa-solid fa-pen"></i>
        </button>
      </div>
      <div className="profileWrap">
          <img src={profileImage} alt="profile" className="profile-image" />
        <h2>
          {userName}
        </h2>
      </div>
      <h3 className="recent-t">RECENT PLAY</h3>
      {recentPlays.length > 0 ? (
        <PlayList musics={recentPlays} isProfile={true} />
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px" }}>No recent plays</p>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="edit-name-wrap">
            <h3>Edit User Name</h3>
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Enter new username"
              className="edit-name"
              style={{padding: "8px", marginBottom: "10px" }}
            />
            </div>
            <div className="image-select">
              <h3>Select Profile Image</h3>
              <div className="image-options">
                {defaultImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Profile ${index + 1}`}
                    onClick={() => setNewProfileImage(image)}
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      margin: "5px",
                      cursor: "pointer",
                      border: newProfileImage === image ? "3px solid #98d639" : "none",
                    }}
                  />
                ))}

              <div>
                <label for="file-up" className="up-label">+</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ marginTop: "10px" }}
                  id="file-up"
                />
              </div>
              </div>
            </div>
            <div className="modal-buttons">
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
