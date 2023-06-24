import "./App.css";

import { forumData } from "./forumData";
import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Badge,
  Button,
  Stack,
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon, StarIcon } from "@chakra-ui/icons";

function App() {
  const [posts, setPosts] = useState(forumData.posts);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleUpvote = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId ? { ...post, upvotes: post.upvotes + 1 } : post
      )
    );
  };

  const handleDownvote = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId ? { ...post, upvotes: post.upvotes - 1 } : post
      )
    );
  };

  const handleBookmark = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    );
  };

  const handleOpenComments = (post) => {
    setSelectedPost(post);
  };

  const handleCloseComments = () => {
    setSelectedPost(null);
  };

  const sortedPosts = [...posts].sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );

  const { name, username, picUrl } = forumData;

  return (
    <Flex maxW="800px" m="0 auto" p="20px">
      <Box w="150px" bg="#f0f0f0" position="sticky" top="0" left="0">
        <Stack spacing="10px" p="10px">
          <Text>Home</Text>
          <Text>Explore</Text>
          <Text>Bookmarks</Text>
          <Text>Profile</Text>
        </Stack>
      </Box>
      <Box flex="1">
        <Heading as="h1" mb="20px">
          User Feed
        </Heading>
        {selectedPost ? (
          <Box>
            <Heading as="h2" mb="10px">
              {selectedPost.post}
            </Heading>
            <Text>{selectedPost.postDescription}</Text>
            <Button onClick={handleCloseComments} mt="10px">
              Close Comments
            </Button>
            <Stack spacing="10px" mt="10px">
              {selectedPost.comments.map((comment) => (
                <Box key={comment.commentId} border="1px solid #ccc" p="10px">
                  <Text>{comment.comment}</Text>
                </Box>
              ))}
            </Stack>
          </Box>
        ) : (
          <Stack spacing="10px">
            {sortedPosts.map((post) => (
              <Box key={post.postId} border="1px solid #ccc" p="10px" mb="10px">
                <Flex alignItems="center">
                  <Image
                    src={post.picUrl}
                    alt={post.name}
                    w="50px"
                    h="50px"
                    borderRadius="50%"
                    mr="10px"
                  />
                  <Box>
                    <Heading as="h2" fontSize="lg" mb="5px">
                      {post.post}
                    </Heading>
                    <Text fontSize="sm">{post.postDescription}</Text>
                  </Box>
                </Flex>
                <Flex alignItems="center" mt="10px">
                  {post.tags.map((tag) => (
                    <Badge key={tag} mr="5px" colorScheme="gray">
                      {tag}
                    </Badge>
                  ))}
                  <Button
                    onClick={() => handleOpenComments(post)}
                    variant="link"
                    p="0"
                  >
                    Comment
                  </Button>
                  <Button
                    onClick={() => handleBookmark(post.postId)}
                    variant={post.isBookmarked ? "solid" : "outline"}
                    colorScheme={post.isBookmarked ? "yellow" : "gray"}
                    size="sm"
                    leftIcon={<StarIcon />}
                  >
                    Bookmark
                  </Button>
                  <Button disabled variant="link" p="0">
                    Share
                  </Button>
                  <Flex alignItems="center" ml="auto">
                    <Button
                      onClick={() => handleUpvote(post.postId)}
                      size="xs"
                      leftIcon={<ChevronUpIcon />}
                    >
                      {post.upvotes}
                    </Button>
                    <Button
                      onClick={() => handleDownvote(post.postId)}
                      size="xs"
                      leftIcon={<ChevronDownIcon />}
                    >
                      {post.downvotes}
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
      <Box
        position="absolute"
        bottom="10px"
        left="10px"
        display="flex"
        alignItems="center"
      >
        <Image
          src={picUrl}
          alt={name}
          w="30px"
          h="30px"
          borderRadius="50%"
          mr="10px"
        />
        <Box>
          <Heading as="h3" fontSize="sm" mb="0">
            {name}
          </Heading>
          <Text fontSize="xs">@{username}</Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default App;
