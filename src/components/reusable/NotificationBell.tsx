import { Bell, Check, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { initSocket } from "@/services/socket";
import {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
} from "@/helper/NotificationService";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Fetch notifications and unread count from single API
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await getUserNotifications();

      let notificationsArray: Notification[] = [];
      let count = 0;

      // Extract notifications array
      if (
        response?.data?.notifications &&
        Array.isArray(response.data.notifications)
      ) {
        notificationsArray = response.data.notifications;
      } else if (
        response?.notifications &&
        Array.isArray(response.notifications)
      ) {
        notificationsArray = response.notifications;
      } else if (Array.isArray(response?.data)) {
        notificationsArray = response.data;
      } else if (Array.isArray(response)) {
        notificationsArray = response;
      }

      // Extract unread count from the same response
      if (response?.data?.unreadCount !== undefined) {
        count = response.data.unreadCount;
      } else if (response?.unreadCount !== undefined) {
        count = response.unreadCount;
      } else {
        // Fallback: calculate from notifications array
        count = notificationsArray.filter((n) => !n.isRead).length;
      }

      setNotifications(notificationsArray);
      setUnreadCount(count);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Mark single notification as read
  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, isRead: true } : notif
        )
      );
      // Decrease unread count locally
      setUnreadCount((prev) => Math.max(0, prev - 1));
      toast.success("Notification marked as read");
    } catch (error) {
      toast.error("Failed to mark as read");
      // Refresh to get accurate count
      fetchNotifications();
    }
  };

  // Mark all as read
  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, isRead: true }))
      );
      setUnreadCount(0);
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Failed to mark all as read");
      // Refresh to get accurate count
      fetchNotifications();
    }
  };

  // Delete single notification
  const handleDelete = async (id: string) => {
    try {
      // Check if the notification being deleted is unread
      const deletedNotif = notifications.find((n) => n.id === id);
      const wasUnread = deletedNotif && !deletedNotif.isRead;

      await deleteNotification(id);
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));

      // Decrease unread count if deleted notification was unread
      if (wasUnread) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }

      toast.success("Notification deleted");
    } catch (error) {
      toast.error("Failed to delete notification");
      // Refresh to get accurate count
      fetchNotifications();
    }
  };

  // Delete all notifications
  const handleDeleteAll = async () => {
    try {
      await deleteAllNotifications();
      setNotifications([]);
      setUnreadCount(0);
      toast.success("All notifications deleted");
    } catch (error) {
      toast.error("Failed to delete all notifications");
      // Refresh to get accurate count
      fetchNotifications();
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchNotifications();

    if (user?.id) {
      const socket = initSocket(user.id);

      socket.on("new_notification", (data: any) => {
        console.log("🔔 New notification received:", data);
        // Refresh notifications to get updated list and count
        fetchNotifications();
      });

      socket.on("receive_message", () => {
        // Refresh notifications when message received
        fetchNotifications();
      });

      return () => {
        socket.off("new_notification");
        socket.off("receive_message");
      };
    }
  }, [user?.id]);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative cursor-pointer">
          <Bell className="w-6 h-6 text-gray-700 hover:text-blue-600 transition" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-96 p-0 mt-10 z-100 shadow-xl bg-gray-200 border-gray-300"
        align="end"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-gray-50">
          <h3 className="font-semibold text-lg">Notifications</h3>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Mark all read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="text-xs text-red-600 hover:text-red-700 font-medium"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-300 hover:bg-gray-50 transition ${
                  !notification.isRead ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">
                        {notification.title}
                      </h4>
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {!notification.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="p-1 hover:bg-gray-200 rounded transition"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4 text-green-600" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="p-1 hover:bg-gray-200 rounded transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
