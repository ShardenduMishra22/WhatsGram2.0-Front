/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User as UserIcon, Mail, MessageSquare } from 'lucide-react';
import userConversation from "../../zustand/useConversation.ts";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

// Updated User interface to include all required properties
interface User {
  _id: string;
  username: string;
  email: string;
  profilepic?: string;
  fullname: string; // Ensure this property is included
  gender: string;   // Ensure this property is included
}

interface SearchResultsProps {
  searchResults: User[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults }) => {
  const { setSelectedConversation } = userConversation();

  const handleClick = async (user: User) => { // Ensure user is of type User
    console.log(user);
    // Passing a complete object with all required properties
    setSelectedConversation({
      fullname: user.fullname,
      _id: user._id,
      username: user.username,
      email: user.email,
      profilepic: user.profilepic || "", // Default to empty string if undefined
      gender: user.gender,
    });
  };

  return (
    <AnimatePresence mode="wait">
      {searchResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="max-h-96 overflow-y-auto space-y-2" // Set max height and enable vertical scrolling
        >
          {searchResults.map((user) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                onClick={() => handleClick(user)} // user is correctly typed
                className="cursor-pointer transition-colors hover:bg-gray-50"
              >
                <CardContent className="p-4 flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    {user.profilepic ? (
                      <AvatarImage src={user.profilepic} alt={user.username} />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600">
                        <UserIcon className="h-6 w-6 text-white" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {user.username}
                      </h3>
                      <MessageSquare className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Mail className="h-3 w-3" />
                      <p className="truncate">{user.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchResults;
