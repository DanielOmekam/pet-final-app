import React, { useEffect, useState } from 'react';
import { List, Button, Form, Input, message } from 'antd';
import {
  getCommentsForReview,
  createComment,
  updateComment,
  deleteComment,
} from '../utils/api';
import { useUser } from '../contexts/UserContext';

function ReviewComments({ review, onCommentsChange }) {
  const [comments, setComments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const { user } = useUser(); // Get logged-in user

  const fetchComments = async () => {
    try {
      const data = await getCommentsForReview(review.id);
      setComments(data);
    } catch (err) {
      message.error('Failed to load comments');
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCreate = async (values) => {
    if (!user) {
      message.error('You need to log in to add a comment');
      return;
    }

    try {
      await createComment({ userId: user.id, reviewId: review.id, text: values.text });
      message.success('Comment added successfully!');
      fetchComments();
      onCommentsChange();
      setShowForm(false);
    } catch (err) {
      message.error('Failed to add comment');
    }
  };

  return (
    <div style={{ marginTop: '1rem', width: '100%' }}>
      <Button onClick={() => setShowForm(!showForm)} disabled={!user}>
        {showForm ? 'Cancel Comment' : 'Add Comment'}
      </Button>

      {showForm && (
        <Form layout="inline" onFinish={handleCreate} style={{ marginTop: '0.5rem' }}>
          <Form.Item
            name="text"
            rules={[{ required: true, message: 'Comment text required' }]}
          >
            <Input placeholder="Write a comment..." />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      )}

      <List
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <>
              <div>
                <strong>{comment.user?.email || 'User'}:</strong> {comment.text}
              </div>
            </>
          </List.Item>
        )}
      />
    </div>
  );
}

export default ReviewComments;
