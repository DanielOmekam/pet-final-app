import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, List, Form, Input, Button, Rate, Spin } from 'antd';
import { getPetById, getReviewsForPet, createReview } from '../utils/api';
import ReviewComments from './ReviewComments';

function PetDetailPage() {
  const { id } = useParams();
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
      //
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
      //
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleReviewSubmit = async (values) => {
    // For demonstration, let's just set userId = 1
    const userId = 1;
    const { rating, text } = values;
    try {
      await createReview({ userId, petId: Number(id), rating, text });
      fetchReviews();
    } catch (err) {
      // handle error
    }
  };

  useEffect(() => {
    fetchPet();
    fetchReviews();
    // eslint-disable-next-line
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
        <Button type="primary" htmlType="submit">
          Submit Review
        </Button>
      </Form>
    </div>
  );
}

export default PetDetailPage;
