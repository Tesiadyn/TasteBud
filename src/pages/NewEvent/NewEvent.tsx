import {
  Container,
  FormTitle,
  Wrapper,
  FormSection,
  InputForm,
  InputLabel,
  InputField,
  SubmitButton,
  TagsDiv,
  Tag,
  BannerSection,
  HintText,
} from "./NewEventStyle";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, firestore, storage } from "../../utilities/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import imageCompression from "browser-image-compression";
import { toaster } from "evergreen-ui";

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
  const today = new Date().toISOString().split("T")[0];

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const imageFile = files[0];
      // console.log("originalFile instanceof Blob", imageFile instanceof Blob);
      // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(imageFile, options);
        // console.log(
        //   "compressedFile instanceof Blob",
        //   compressedFile instanceof Blob
        // );
        // console.log(
        //   `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        // );

        // await uploadCoverImg(compressedFile);
        setCoverImage(compressedFile);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const uploadCoverImg = async (file: File | null) => {
    let coverImageUrl = "";

    if (!file) {
      coverImageUrl =
        "https://firebasestorage.googleapis.com/v0/b/tastebud-2dd90.appspot.com/o/coverImages%2FdefaultCover.png?alt=media&token=c88a6751-3554-4816-a273-8fd376a498f6";
      return Promise.resolve(coverImageUrl);
    }

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
        } else {
          coverImageUrl = await uploadCoverImg(null);
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
          time,
        };
        const eventDocRef = await addDoc(
          collection(firestore, "Events"),
          eventData
        );
        const eventUid = eventDocRef.id;
        const updatedEventData = { ...eventData, eventUid };
        await updateDoc(eventDocRef, updatedEventData);
        navigate("/events");
        toaster.success('Event created!')
        // console.log("Doc written with ID : ", eventDocRef.id);
      } catch (err) {
        console.error("Error adding event data : ", err);
      }
    };
    updateEventData();

  };

  useEffect(() => {
    const user = getAuth();
    const unsubscribe = onAuthStateChanged(user, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
    return unsubscribe;
  }, [navigate]);

  return (
    <Container>
      <Wrapper elevation={10}>
        <BannerSection></BannerSection>
        <FormSection onSubmit={handleSubmit}>
          <FormTitle>NEW EVENT</FormTitle>
          <InputForm>
            <InputLabel htmlFor="title">Event Title</InputLabel>
            <InputField
              id="title"
              placeholder="Enter the title of event.(Max: 150 characters)"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={150}
            />
            <InputLabel htmlFor="text">Event Content</InputLabel>
            <InputField
              id="text"
              placeholder="Enter the content.(Max: 250 characters)"
              type="text"
              onChange={(e) => setText(e.target.value)}
              required
              maxLength={250}
            />
            <InputLabel htmlFor="date">Event Date</InputLabel>
            <InputField
              id="date"
              placeholder="Enter the event Date"
              type="date"
              min={today}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <InputLabel htmlFor="time">Event Time</InputLabel>
            <InputField
              id="time"
              placeholder="Enter the event time"
              type="time"
              onChange={(e) => setTime(e.target.value)}
              required
            />
            <InputLabel htmlFor="location">Location</InputLabel>
            <InputField
              id="location"
              placeholder="Enter the location (Max: 150 characters)"
              type="text"
              onChange={(e) => setLocation(e.target.value)}
              required
              maxLength={150}
            />
            <InputLabel htmlFor="number">Maximum Guests</InputLabel>
            <InputField
              id="number"
              placeholder="Enter maximum guests (Max: 200)"
              type="number"
              min={1}
              onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
              required
              max={200}
            />
            <InputLabel htmlFor="pic">Cover Image</InputLabel>
            <InputField
              id="pic"
              placeholder="Upload a cover image"
              type="file"
              accept="image/*"
              // onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              onChange={(e) => handleImageChange(e)}
            />

            <TagsDiv>
              <Tag>
                <InputLabel>Bourbon</InputLabel>
                <InputField
                  type="checkbox"
                  name="bourbon"
                  onChange={handleCheckboxChange}
                  checked={selectedTags.includes("bourbon")}
                  className="checkbox"
                />
              </Tag>
              <Tag>
                <InputLabel>Blended</InputLabel>
                <InputField
                  type="checkbox"
                  name="blended"
                  onChange={handleCheckboxChange}
                  checked={selectedTags.includes("blended")}
                  className="checkbox"
                />
              </Tag>
              <Tag>
                <InputLabel>Newbie</InputLabel>
                <InputField
                  type="checkbox"
                  name="newbie"
                  onChange={handleCheckboxChange}
                  checked={selectedTags.includes("newbie")}
                  className="checkbox"
                />
              </Tag>
              <Tag>
                <InputLabel>Theme</InputLabel>

                <InputField
                  type="checkbox"
                  name="theme"
                  onChange={handleCheckboxChange}
                  checked={selectedTags.includes("theme")}
                  className="checkbox"
                />
              </Tag>
              <Tag>
                <InputLabel>North</InputLabel>
                <InputField
                  type="checkbox"
                  name="north"
                  onChange={handleCheckboxChange}
                  checked={selectedTags.includes("north")}
                  className="checkbox"
                />
              </Tag>
              <Tag>
                <InputLabel>Middle</InputLabel>
                <InputField
                  type="checkbox"
                  name="middle"
                  onChange={handleCheckboxChange}
                  checked={selectedTags.includes("middle")}
                  className="checkbox"
                />
              </Tag>
              <Tag>
                <InputLabel>South</InputLabel>
                <InputField
                  type="checkbox"
                  name="south"
                  onChange={handleCheckboxChange}
                  checked={selectedTags.includes("south")}
                  className="checkbox"
                />
              </Tag>
              <Tag>
                <InputLabel>Scotland</InputLabel>
                <InputField
                  type="checkbox"
                  name="scotland"
                  onChange={handleCheckboxChange}
                  checked={selectedTags.includes("scotland")}
                  className="checkbox"
                />
              </Tag>
              <Tag>
                <InputLabel>Kentucky</InputLabel>
                <InputField
                  type="checkbox"
                  name="kentucky"
                  onChange={handleCheckboxChange}
                  checked={selectedTags.includes("kentucky")}
                  className="checkbox"
                />
              </Tag>
              <Tag>
                <InputLabel>Ireland</InputLabel>
                <InputField
                  type="checkbox"
                  name="ireland"
                  onChange={handleCheckboxChange}
                  checked={selectedTags.includes("ireland")}
                  className="checkbox"
                />
              </Tag>
              <Tag>
                <InputLabel>Others</InputLabel>
                <InputField
                  type="checkbox"
                  name="other"
                  onChange={handleCheckboxChange}
                  checked={selectedTags.includes("other")}
                  className="checkbox"
                />
              </Tag>
            </TagsDiv>
            <HintText>Select Tags that is related to your event!</HintText>
            <SubmitButton>Submit</SubmitButton>
          </InputForm>
        </FormSection>
      </Wrapper>
    </Container>
  );
};
export default NewEvent;
