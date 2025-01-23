import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, List, Form, Input, Button, Rate, Spin, message } from 'antd';
import { getPetById, getReviewsForPet, createReview } from '../utils/api';
import ReviewComments from './ReviewComments';
import { useUser } from '../contexts/UserContext';

function PetDetailPage() {
  const { id } = useParams();
  const { user } = useUser(); // Get logged-in user
  const [pet, setPet] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingPet, setLoadingPet] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const fetchPet = async () => {
    setLoadingPet(true);
    try {
      const data = await getPetById(id);
      setPet(data);
    } catch (err) {
      message.error('Failed to fetch pet details');
    } finally {
      setLoadingPet(false);
    }
  };

  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const data = await getReviewsForPet(id);
      setReviews(data);
    } catch (err) {
      message.error('Failed to fetch reviews');
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleReviewSubmit = async (values) => {
    if (!user) {
      message.error('You need to log in to submit a review');
      return;
    }

    const { rating, text } = values;
    try {
      await createReview({ userId: user.id, petId: Number(id), rating, text });
      message.success('Review submitted successfully!');
      fetchReviews(); // Refresh reviews
    } catch (err) {
      message.error('Failed to submit review');
    }
  };

  useEffect(() => {
    fetchPet();
    fetchReviews();
  }, [id]);

  if (loadingPet) return <Spin />;
  if (!pet) return <p>Pet not found.</p>;

  return (
    <div style={{ background: '#fff', padding: '1rem' }}>
      <Card title={`${pet.name} (ID: ${pet.id})`}>
        <p>Species: {pet.species}</p>
        <p>Age: {pet.age || 'N/A'}</p>
      </Card>

      <h2 style={{ marginTop: '1rem' }}>Reviews</h2>
      {loadingReviews ? (
        <Spin />
      ) : reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <List
          dataSource={reviews}
          renderItem={(review) => (
            <List.Item style={{ alignItems: 'flex-start', flexDirection: 'column' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Rating:</strong> {review.rating} by {review.user?.email || 'Unknown'}
              </div>
              <div>{review.text}</div>
              <ReviewComments review={review} onCommentsChange={fetchReviews} />
            </List.Item>
          )}
        />
      )}

      <h3 style={{ marginTop: '2rem' }}>Add a Review</h3>
      <Form layout="vertical" onFinish={handleReviewSubmit}>
        <Form.Item
          label="Rating"
          name="rating"
          rules={[{ required: true, message: 'Please give a rating' }]}
        >
          <Rate />
        </Form.Item>
        <Form.Item
          label="Review Text"
          name="text"
          rules={[{ required: true, message: 'Please enter review text' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Button type="primary" htmlType="submit" disabled={!user}>
          {user ? 'Submit Review' : 'Log in to Submit'}
        </Button>
      </Form>
    </div>
  );
}

export default PetDetailPage;
