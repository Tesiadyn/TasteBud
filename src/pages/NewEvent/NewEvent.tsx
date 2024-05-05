import {
  Container,
  FormTitle,
  Wrapper,
  FormSection,
  InputForm,
  InputLabel,
  InputField,
  SubmitButton,
} from "./NewEventStyle";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, firestore, storage } from "../../utilities/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const NewEvent = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(0);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const uploadCoverImg = async (file: File) => {
    const storageRef = ref(storage, `coverImages/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (err) => {
          reject(err);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        }
      );
    });
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      setSelectedTags((prevTags) => [...prevTags, name]);
    } else {
      setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== name));
    }
  };  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    const userUid = user?.uid;

    const updateEventData = async () => {
      try {
        if (!user) {
          console.error("User not authenticated.");
          navigate("/login");
        }
        const tags = selectedTags;
        let coverImageUrl = "";
        if (coverImage) {
          coverImageUrl = await uploadCoverImg(coverImage);
        }
        const eventData = {
          organizerUid: userUid,
          participantsUid: [],
          location,
          title,
          coverImage: coverImageUrl,
          maxParticipants,
          text,
          date,
          tags,
          time
        };
        const eventDocRef = await addDoc(collection(firestore, "Events"), eventData);
        const eventUid = eventDocRef.id;
        const updatedEventData = { ...eventData, eventUid };
        await updateDoc(eventDocRef, updatedEventData);
        navigate('/events');
        console.log("Doc written with ID : ", eventDocRef.id);
      } catch (err) {
        console.error("Error adding event data : ", err);
      }
    }
    updateEventData()
  };

  console.log(selectedTags);

  useEffect (() => {
    const user = getAuth();
    const unsubscribe = onAuthStateChanged(user, (user) => {
      if(!user){
        navigate("/login");
      }
    })
    return unsubscribe;
  },[navigate])



  return (
    <Container>
      <Wrapper>
        <FormSection onSubmit={handleSubmit}>
          <FormTitle>新活動</FormTitle>
          <InputForm>
            <InputLabel htmlFor="title">活動名稱</InputLabel>
            <InputField
              id="title"
              placeholder="請輸入名稱"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <InputLabel htmlFor="text">活動內容</InputLabel>
            <InputField
              id="text"
              placeholder="請輸入活動內容"
              type="text"
              onChange={(e) => setText(e.target.value)}
              required
            />
            <InputLabel htmlFor="date">活動日期</InputLabel>
            <InputField
              id="date"
              placeholder="請輸入活動日期"
              type="date"
              min={today}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <InputLabel htmlFor="time">活動時間</InputLabel>
            <InputField
              id="time"
              placeholder="請輸入活動時間"
              type="time"
              onChange={(e) => setTime(e.target.value)}
              required
            />
            <InputLabel htmlFor="location">地點</InputLabel>
            <InputField
              id="location"
              placeholder="請輸入地點"
              type="text"
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <InputLabel htmlFor="number">最大人數</InputLabel>
            <InputField
              id="number"
              placeholder="最大人數"
              type="number"
              min={1}
              onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
              required
            />
            <InputLabel htmlFor="pic">封面照片</InputLabel>
            <InputField
              id="pic"
              placeholder="活動封面"
              type="file"
              onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
            />
            <InputLabel>
              <input
                type="checkbox"
                name="singleMalt"
                onChange={handleCheckboxChange}
                checked={selectedTags.includes("singleMalt")}
              />
              單一麥芽
            </InputLabel>
            <InputLabel>
              <input
                type="checkbox"
                name="blended"
                onChange={handleCheckboxChange}
                checked={selectedTags.includes("blended")}
              />
              調和
            </InputLabel>
            <InputLabel>
              <input
                type="checkbox"
                name="newbie"
                onChange={handleCheckboxChange}
                checked={selectedTags.includes("newbie")}
              />
              新手友善
            </InputLabel>
            <InputLabel>
              <input
                type="checkbox"
                name="theme"
                onChange={handleCheckboxChange}
                checked={selectedTags.includes("theme")}
              />
              主題品酒
            </InputLabel>
            <InputLabel>
              <input
                type="checkbox"
                name="north"
                onChange={handleCheckboxChange}
                checked={selectedTags.includes("north")}
              />
              北部
            </InputLabel>
            <InputLabel>
              <input
                type="checkbox"
                name="middle"
                onChange={handleCheckboxChange}
                checked={selectedTags.includes("middle")}
              />
              中部
            </InputLabel>
            <InputLabel>
              <input
                type="checkbox"
                name="south"
                onChange={handleCheckboxChange}
              
              />
              南部
            </InputLabel>
            <InputLabel>
              <input
                type="checkbox"
                name="scotland"
                onChange={handleCheckboxChange}
                checked={selectedTags.includes("scotland")}
              />
              蘇格蘭
            </InputLabel>
            <InputLabel>
              <input
                type="checkbox"
                name="kentucky"
                onChange={handleCheckboxChange}
                checked={selectedTags.includes("kentucky")}
              />
              肯塔基
            </InputLabel>
            <InputLabel>
              <input
                type="checkbox"
                name="ireland"
                onChange={handleCheckboxChange}
                checked={selectedTags.includes("ireland")}
              />
              愛爾蘭
            </InputLabel>
            <InputLabel>
              <input
                type="checkbox"
                name="other"
                onChange={handleCheckboxChange}
                checked={selectedTags.includes("other")}
              />
              其他產區
            </InputLabel>
            <SubmitButton>舉辦新活動</SubmitButton>
          </InputForm>
        </FormSection>
      </Wrapper>
    </Container>
  );
};
export default NewEvent;
