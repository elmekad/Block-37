import { useState, useEffect } from 'react';
import api from '../services/api';

const Comments = ({ reviewId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      const response = await api.get(`/api/reviews/${reviewId}/comments`);
      setComments(response.data);
    }
    fetchComments();
  }, [reviewId]);

  return (
    <div>
      <h3>Comments</h3>
      {comments.map(comment => (
        <div key={comment.id}>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
