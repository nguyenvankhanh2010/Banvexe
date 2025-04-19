"use client"

import type React from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

interface NotificationFormProps {
  notification?: any
  onSubmit: () => void
}

export function NotificationForm({ notification, onSubmit }: NotificationFormProps) {
  const isEditing = !!notification

  const [formData, setFormData] = useState({
    title: notification?.title || "",
    content: notification?.content || "",
    target: notification?.target || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when field is changed
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Vui lòng nhập tiêu đề"
    }

    if (!formData.content.trim()) {
      newErrors.content = "Vui lòng nhập nội dung"
    }

    if (!formData.target) {
      newErrors.target = "Vui lòng chọn đối tượng nhận"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // In a real app, this would call an API to save the notification
    console.log("Saving notification:", formData)

    toast({
      title: isEditing ? "Cập nhật thành công" : "Tạo thông báo thành công",
      description: `Thông báo "${formData.title}" đã được ${isEditing ? "cập nhật" : "tạo"} thành công`,
    })

    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="title">Tiêu đề</Label>
          <Input id="title" value={formData.title} onChange={(e) => handleChange("title", e.target.value)} />
          {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Nội dung</Label>
          <Textarea
            id="content"
            rows={5}
            value={formData.content}
            onChange={(e) => handleChange("content", e.target.value)}
          />
          {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="target">Đối tượng nhận</Label>
          <Select value={formData.target} onValueChange={(value) => handleChange("target", value)}>
            <SelectTrigger id="target">
              <SelectValue placeholder="Chọn đối tượng nhận" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="staff">Nhân viên</SelectItem>
              <SelectItem value="customer">Khách hàng</SelectItem>
              <SelectItem value="all">Tất cả</SelectItem>
            </SelectContent>
          </Select>
          {errors.target && <p className="text-sm text-destructive">{errors.target}</p>}
        </div>
      </div>

      <DialogFooter>
        <Button type="submit">{isEditing ? "Cập nhật" : "Gửi thông báo"}</Button>
      </DialogFooter>
    </form>
  )
}
