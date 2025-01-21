import React, { useEffect, useState } from 'react';
import { List, Button, Form, Input, message } from 'antd';
import {
  getCommentsForReview,
  createComment,
  updateComment,
  deleteComment
} from '../utils/api';

function ReviewComments({ review, onCommentsChange }) {
  const [comments, setComments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingComment, setEditingComment] = useState(null);

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
    // eslint-disable-next-line
  }, []);

  const handleCreate = async (values) => {
    const userId = 1; // Hard-coded for demonstration
    try {
      await createComment({ userId, reviewId: review.id, text: values.text });
      message.success('Comment created');
      fetchComments();
      onCommentsChange(); // Refresh parent if needed
      setShowForm(false);
    } catch (err) {
      message.error('Failed to create comment');
    }
  };

  const handleUpdate = async (commentId, newText) => {
    try {
      await updateComment(commentId, newText);
      message.success('Comment updated');
      fetchComments();
      onCommentsChange();
      setEditingComment(null);
    } catch (err) {
      message.error('Failed to update comment');
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      message.success('Comment deleted');
      fetchComments();
      onCommentsChange();
    } catch (err) {
      message.error('Failed to delete comment');
    }
  };

  return (
    <div style={{ marginTop: '1rem', width: '100%' }}>
      <Button onClick={() => setShowForm(!showForm)}>
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
            {editingComment?.id === comment.id ? (
              <EditCommentForm
                comment={comment}
                onUpdate={handleUpdate}
                onCancel={() => setEditingComment(null)}
              />
            ) : (
              <>
                <div>
                  <strong>{comment.user?.email || 'User'}:</strong> {comment.text}
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  <Button
                    type="link"
                    onClick={() => setEditingComment(comment)}
                    style={{ marginRight: '0.5rem' }}
                  >
                    Edit
                  </Button>
                  <Button type="link" danger onClick={() => handleDelete(comment.id)}>
                    Delete
                  </Button>
                </div>
              </>
            )}
          </List.Item>
        )}
      />
    </div>
  );
}

function EditCommentForm({ comment, onUpdate, onCancel }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onUpdate(comment.id, values.text);
  };

  useEffect(() => {
    form.setFieldsValue({ text: comment.text });
    // eslint-disable-next-line
  }, [comment]);

  return (
    <Form form={form} layout="inline" onFinish={handleFinish}>
      <Form.Item
        name="text"
        rules={[{ required: true, message: 'Comment text required' }]}
      >
        <Input placeholder="Edit comment..." />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Update
      </Button>
      <Button style={{ marginLeft: '0.5rem' }} onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
}

export default ReviewComments;
