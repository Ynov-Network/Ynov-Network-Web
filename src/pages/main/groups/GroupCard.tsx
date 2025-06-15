import {
  Users,
  MessageCircle,
  Crown,
  Lock,
  Globe
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Group } from "@/services/groups/api";

interface GroupCardProps {
  group: Group;
  onJoin: (groupId: string, groupName: string) => void;
  onViewDetails: (group: Group) => void;
  isJoining: boolean;
}

export const GroupCard = ({ group, onJoin, onViewDetails, isJoining }: GroupCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-white via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800/50 border-0 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_20px_60px_rgb(0,0,0,0.4)] transition-all duration-500 cursor-pointer backdrop-blur-sm">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 dark:to-primary/10" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl transform translate-x-16 -translate-y-16" />

      {/* Content Container */}
      <div className="relative px-4 py-2 h-full flex flex-col" onClick={() => onViewDetails(group)}>
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="size-12 ring-4 ring-white/50 dark:ring-gray-800/50 shadow-lg">
                <AvatarImage src={group.creator_id.profile_picture_url} className="object-cover" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-semibold">
                  {group.name[0]}
                </AvatarFallback>
              </Avatar>
              {group.is_admin && (
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full p-1 shadow-lg">
                  <Crown className="size-3 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg leading-tight text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300 truncate">
                {group.name}
              </h3>
              <Badge variant="secondary" className="mt-1 bg-primary/10 text-primary border-primary/20 text-xs font-medium">
                {group.topic}
              </Badge>
            </div>
          </div>

          {/* Privacy Badge */}
          <div className="flex-shrink-0">
            {group.is_public ? (
              <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white border-0 shadow-lg shadow-emerald-500/25">
                <Globe className="size-3 mr-1" />
                Public
              </Badge>
            ) : (
              <Badge className="bg-gradient-to-r from-rose-500 to-red-500 text-white border-0 shadow-lg shadow-rose-500/25">
                <Lock className="size-3 mr-1" />
                Private
              </Badge>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-6 leading-relaxed flex-grow">
          {group.description}
        </p>

        {/* Stats Section */}
        <div className="flex items-center justify-between mb-6 p-3 rounded-xl bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Users className="size-4 text-primary" />
              </div>
              <span className="font-medium text-sm">{group.members.length}</span>
              <span className="text-xs text-gray-500">members</span>
            </div>

            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />

            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <MessageCircle className="size-4 text-primary" />
              </div>
              <span className="font-medium text-sm">{group.post_count}</span>
              <span className="text-xs text-gray-500">posts</span>
            </div>
          </div>

          {/* Activity Indicator */}
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 animate-pulse" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Active</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          {group.is_member || group.is_admin ? (
            <Button
              variant="outline"
              className="w-full h-11 border-2 border-primary/20 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 font-medium shadow-sm hover:shadow-lg hover:shadow-primary/25"
              onClick={(e) => { e.stopPropagation(); onViewDetails(group); }}
            >
              View Group
            </Button>
          ) : (
            <Button
              className="w-full h-11 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 border-0"
              onClick={(e) => { e.stopPropagation(); onJoin(group._id, group.name); }}
              disabled={isJoining}
            >
              {isJoining
                ? (
                  <div className="flex items-center gap-2">
                    <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Joining...
                  </div>
                )
                : group.is_public
                  ? "Join Group"
                  : "Request to Join"
              }
            </Button>
          )}
        </div>
      </div>

      {/* Hover Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </Card>
  );
};