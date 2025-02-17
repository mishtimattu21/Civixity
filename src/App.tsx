import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Library from './components/Library';
import Chatbot from './components/Chatbot';
import Contacts from './components/Contacts';


// Define interfaces for props and state
interface PostProps {
  avatar?: string;
  username: string;
  timeAgo: string;
  content: string;
  imageUrl?: string;
}

const Post: React.FC<PostProps> = ({ avatar, username, timeAgo, content, imageUrl }) => {
  const [vote, setVote] = useState<'upvote' | 'downvote' | null>(null);
  const [voteCount, setVoteCount] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleUpvote = () => {
    if (vote === 'upvote') {
      setVote(null);
      setVoteCount((prev) => prev - 1);
    } else {
      if (vote === 'downvote') {
        setVoteCount((prev) => prev + 2);
      } else {
        setVoteCount((prev) => prev + 1);
      }
      setVote('upvote');
    }
  };

  const handleDownvote = () => {
    if (vote === 'downvote') {
      setVote(null);
      setVoteCount((prev) => prev + 1);
    } else {
      if (vote === 'upvote') {
        setVoteCount((prev) => prev - 2);
      } else {
        setVoteCount((prev) => prev - 1);
      }
      setVote('downvote');
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments((prev) => [...prev, newComment]);
      setNewComment('');
      setShowCommentInput(false);
    }
  };

  const handleDeleteComment = (index: number) => {
    setComments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-beige rounded-lg p-5 mb-5 shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <div>
          <div className="font-bold">{username}</div>
          <div className="text-xs text-gray-600">{timeAgo}</div>
        </div>
      </div>
      <div className="mb-4">
        {content}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Post content"
            className="w-full max-h-[300px] object-cover rounded mt-2"
          />
        )}
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleUpvote}
          className={`px-4 py-2 border rounded-md ${
            vote === 'upvote' ? 'bg-green-500 text-white' : 'hover:bg-gray-50'
          }`}
        >
          👍 UPVOTE
        </button>
        <button
          onClick={handleDownvote}
          className={`px-4 py-2 border rounded-md ${
            vote === 'downvote' ? 'bg-red-500 text-white' : 'hover:bg-gray-50'
          }`}
        >
          👎 DOWNVOTE
        </button>
        <div className="font-bold text-lg">
          Votes: <span>{voteCount}</span>
        </div>
        <button
          onClick={() => setShowCommentInput((prev) => !prev)}
          className="px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          💬 Comment
        </button>
      </div>
      {/* Comment input */}
      {showCommentInput && (
        <div className="mt-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type your comment here..."
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={handleAddComment}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Post Comment
          </button>
        </div>
      )}
      {/* Display comments */}
      {comments.length > 0 && (
        <div className="mt-4">
          <div className="font-bold">Comments:</div>
          <ul className="list-disc ml-5">
            {comments.map((comment, index) => (
              <li key={index} className="text-gray-700 mt-2 flex justify-between items-center">
                {comment}
                <button
                  onClick={() => handleDeleteComment(index)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Global complaints array to store all complaints
let complaints = [];

// Global recentComplaints array to store recent complaints for display
let recentComplaints = [];

// Complaint class to ensure consistent data structure
class Complaint {
    constructor(category, description, location, latitude, longitude, photoURL) {
        this.complaintID = Date.now().toString(); // Unique ID based on timestamp
        this.category = category;
        this.description = description;
        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
        this.photoURL = photoURL;
        this.status = 'Pending';
        this.dateReported = new Date();
        this.dateResolved = null;
        this.upvotes = 0;
        this.downvotes = 0;
        this.userComments = [];
    }
}



const CreatePost: React.FC = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<null | string>(null);

  const handlePostIssue = () => {
    console.log({
      description,
      image,
    });
    setDescription("");
    setImage(null);
  };

  const handleCapturePhoto = (photo: string) => {
    setImage(photo);
    setShowCamera(false);
  };

  const handleAttachImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg p-5 mb-5 shadow-md">
        <div className="font-bold mb-4">Post an Issue</div>
        <div className="flex flex-col gap-3">
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue in detail"
            className="p-2 border rounded-md"
          />
          <div className="flex gap-2 items-center">
            {/* Camera Button */}
            <button
              onClick={() => setShowCamera(true)}
              className="bg-green-500 text-white p-2 rounded-md"
            >
              <img src="src/code/camera.png" alt="Camera" className="w-5 h-5" />
            </button>

            {/* Attach Image Button */}
            <label
              htmlFor="file-input"
              className="bg-green-500 text-white p-2 rounded-md "
            >
              <img src="public/upload.jpg" alt="Upload" className="w-5 h-5" />
            </label>
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleAttachImage}
              className="hidden"
            />
          </div>
          <button
            onClick={handlePostIssue}
            className="bg-green-500 text-white p-2 rounded-md self-end"
          >
            Post Issue
          </button>
        </div>
      </div>

      {/* Preview of Attached or Captured Image */}
      {image && (
        <div className="bg-white rounded-lg p-5 shadow-md">
          <div className="text-gray-700 mb-2">{description}</div>
          <img
            src={image}
            alt="Preview"
            className="mt-3 w-full max-h-64 object-cover rounded-md"
          />
        </div>
      )}

      {/* Camera Modal */}
      {showCamera && (
        <div
          id="camera-modal"
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
        >
          <div className="bg-white p-5 rounded-lg text-center">
            <video id="video" autoPlay className="w-full max-h-[300px] mb-4" />
            <canvas id="canvas" className="hidden" />
            <div className="flex gap-2 justify-center">
              <button
                id="capture-button"
                onClick={() => {
                  const canvas = document.getElementById(
                    "canvas"
                  ) as HTMLCanvasElement;
                  const video = document.getElementById(
                    "video"
                  ) as HTMLVideoElement;
                  const context = canvas.getContext("2d");

                  if (context && video) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const photo = canvas.toDataURL("image/png");
                    handleCapturePhoto(photo);
                  }
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                <img src="src/code/camera.png" alt="Capture" className="w-5 h-5" />
                Capture
              </button>
              <button
                id="close-modal"
                onClick={() => {
                  const video = document.getElementById(
                    "video"
                  ) as HTMLVideoElement;
                  const stream = video.srcObject as MediaStream;
                  if (stream) {
                    const tracks = stream.getTracks();
                    tracks.forEach((track) => track.stop());
                  }
                  setShowCamera(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const CaptureMedia: React.FC = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const photo = canvas.toDataURL("image/png");
        setPreview(photo);
        stopCamera();
      }
    }
  };

  const startRecording = () => {
    const video = videoRef.current;
    if (video && video.srcObject) {
      mediaRecorderRef.current = new MediaRecorder(video.srcObject as MediaStream);
      recordedChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        const videoUrl = URL.createObjectURL(blob);
        setRecordedVideo(videoUrl);
        setShowCamera(false);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const stopCamera = () => {
    const video = videoRef.current;
    if (video && video.srcObject) {
      const stream = video.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      video.srcObject = null;
    }
    setShowCamera(false);
  };

  const handlePost = () => {
    console.log("Posting:", preview || recordedVideo);
    setPreview(null);
    setRecordedVideo(null);
  };

  const handleDiscard = () => {
    setPreview(null);
    setRecordedVideo(null);
  };

  return (
    <div>
      <button
        onClick={startCamera}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Open Camera
      </button>

      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg text-center">
            <video ref={videoRef} className="w-full max-h-[300px] mb-4" autoPlay />
            <div className="flex gap-2 justify-center">
              <button
                onClick={capturePhoto}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Capture Photo
              </button>
              {isRecording ? (
                <button
                  onClick={stopRecording}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Stop Recording
                </button>
              ) : (
                <button
                  onClick={startRecording}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                >
                  Record Video
                </button>
              )}
              <button
                onClick={stopCamera}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {(preview || recordedVideo) && (
        <div className="mt-4">
          {preview && <img src={preview} alt="Preview" className="rounded-md" />}
          {recordedVideo && (
            <video
              src={recordedVideo}
              controls
              className="w-full max-h-[300px] rounded-md"
            />
          )}
          <div className="flex gap-4 mt-2">
            <button
              onClick={handlePost}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Post
            </button>
            <button
              onClick={handleDiscard}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Discard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
const SidebarSection: React.FC<{ 
  title: string; 
  children: React.ReactNode;
  onClick?: () => void; 
}> = ({
  title,
  children,
  onClick
}) => (
  <div 
    className={`bg-white rounded-lg p-4 mb-5 ${onClick ? 'cursor-pointer' : ''}`}
    onClick={onClick}
  >
    <div className="bg-[#5D4037] text-white p-3 rounded cursor-pointer mb-3 flex items-center gap-1">
      {title} ➜
    </div>
    {children}
  </div>
);


const MainContent: React.FC = () => {
  return (
    <div className="flex justify-between px-5 py-12 mx-auto max-w-[1800px] mt-[40px]">
      {/* Left Sidebar */}
      <div className="w-[300px] fixed left-5 top-[105px]">
        <div className="bg-[#d7ccc8] bg-opacity-90 rounded-xl p-5 h-[calc(100vh-80px)] overflow-y-auto">
          <SidebarSection title="Issues near you"
           onClick={() => window.open('src/code/nearbyloc4.html', '_blank')}
>
            <img src="public/issues.jpg" alt="Issues" className="w-full rounded" />
          </SidebarSection>
          
<SidebarSection 
  title="Heat Map & Stats" 
  onClick={() => window.open('src/code/heatmap.html', '_blank')}
>
  <img src="public/heatmap.jpg" alt="Heatmap" className="w-full rounded" />
</SidebarSection>
          <SidebarSection title="See resolving trends"
          onClick={() => window.open('src/code/trends2.html', '_blank')}
          >
            <img src="public/trends.jpg" alt="Trends" className="w-full rounded" />
          </SidebarSection>
        </div>
      </div>

      {/* Middle Content */}
      <div className="mx-[340px] bg-white bg-opacity-90 rounded-xl p-5 mt-[-48px]">
        <CreatePost />
        <Post
          username="Lara Kapoor"
          timeAgo="5 min ago"
          content="The market number 2 street in greater kailash is filled with potholes making it extremely difficult for vehicles. I saw 2 children falling down by bicycle today morning."
          imageUrl="public/issue1.jpeg"
        />
        <Post
          username="Tushar"
          timeAgo="1 hour ago"
          content="There is a significant amount of trash scattered on Kailash, creating an unpleasant and unhygienic environment. It poses health risks to residents and negatively impacts the area's appearance."
          imageUrl="public/issues5.png"
        />
      </div>

      {/* Right Sidebar */}
      <div className="w-[300px] fixed right-5 top-[105px]">
        <div className="bg-[#d7ccc8] bg-opacity-90 rounded-xl p-5 h-[calc(100vh-80px)] overflow-y-auto">
        <div
  className="bg-[#5D4037] text-white p-3 rounded mb-3 cursor-pointer"
  onClick={() => window.open('src/code/announcement.html', '_blank')}
>
  📢 Announcements
</div>
          <div
  className="bg-[#5D4037] text-white p-3 rounded mb-3 cursor-pointer"
  onClick={() => window.open('src/code/previssues.html', '_blank')}
>
  📢 Previous Issues
</div>
          <div 
          className="bg-[#5D4037] text-white p-3 rounded mb-3 cursor-pointer"
           onClick={() => window.open('src/code/volunteering.html', '_blank')}
           >
            🤝 Volunteer
            </div>

          <div className="bg-white rounded-lg p-4">
            <div className="font-bold text-lg mb-3">Previous Issues</div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 mb-4">
                <img
                  src={`public/issue${i}.jpg`}
                  alt={`Issue ${i}`}
                  className="w-[70px] h-[70px] rounded"
                />
                <p className="flex-1 text-sm text-gray-700">
                  The market in Kailash is polluted with scattered trash, creating an unhygienic environment...
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showChatbot, setShowChatbot] = useState(true);

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "url('public/img.png')", // Path to your .jpg file
      }}
    >
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <MainContent />
          }
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/register"
          element={<Register setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/library" element={<Library />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>

      {showChatbot && <Chatbot />}
    </div>
  );
}
export default App;