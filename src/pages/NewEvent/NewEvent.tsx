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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("User not authenticated.");
        return;
      }

      const organizerUid = user?.uid;

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
      };
      const docRef = await addDoc(collection(firestore, "Events"), eventData);
      const eventUid = docRef.id;
      const updatedEventData = {...eventData, eventUid};
      await updateDoc(docRef, updatedEventData);
      console.log("Doc written with ID : ", docRef.id);
    } catch (err) {
      console.error("Error adding event data : ", err);
    }
  };

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
            <SubmitButton>舉辦新活動</SubmitButton>
          </InputForm>
        </FormSection>
      </Wrapper>
    </Container>
  );
};
export default NewEvent;
