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
import { useState } from "react";

const NewEvent = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(0);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
  };  const handleSubmit =
 async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("User not authenticated.");
        return;
      }

      const organizerUid = user?.uid;
      const tags = selectedTags;
      let coverImageUrl = "";
      if (coverImage) {
        coverImageUrl = await uploadCoverImg(coverImage);
      }
      const eventData = {
        organizerUid,
        participantsUid: [],
        location,
        title,
        coverImage: coverImageUrl,
        maxParticipants,
        text,
        date,
        tags
      };
      const docRef = await addDoc(collection(firestore, "Events"), eventData);
      const eventUid = docRef.id;
      const updatedEventData = { ...eventData, eventUid };
      await updateDoc(docRef, updatedEventData);
      console.log("Doc written with ID : ", docRef.id);
    } catch (err) {
      console.error("Error adding event data : ", err);
    }
  };
  console.log(selectedTags);
  
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
            />
            <InputLabel htmlFor="text">活動內容</InputLabel>
            <InputField
              id="text"
              placeholder="請輸入活動內容"
              type="text"
              onChange={(e) => setText(e.target.value)}
            />
            <InputLabel htmlFor="text">活動日期</InputLabel>
            <InputField
              id="text"
              placeholder="請輸入活動日期"
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
            <InputLabel htmlFor="location">地點</InputLabel>
            <InputField
              id="location"
              placeholder="請輸入地點"
              type="text"
              onChange={(e) => setLocation(e.target.value)}
            />
            <InputLabel htmlFor="number">最大人數</InputLabel>
            <InputField
              id="number"
              placeholder="最大人數"
              type="number"
              min={1}
              onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
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
