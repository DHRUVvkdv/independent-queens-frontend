import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Plus, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/provider/userProvider";
import { skillCategories } from "@/data/skills";

export function EditProfileDialog() {
	const { user, addSkill, removeSkill, addInterest, removeInterest, setProfileImage, update } =
		useUser();

	const [editedUser, setEditedUser] = useState({ ...user });
	const [skillSearch, setSkillSearch] = useState("");
	const [newInterest, setNewInterest] = useState("");

	const validSkills = Object.values(skillCategories).flat();

	if (!user) return null;

	const handleSave = () => {
		update(editedUser);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			// Extract the file name and update the image path
			const fileName = `/${file.name}`;
			setProfileImage(fileName);
			setEditedUser({ ...editedUser, profile_image_path: fileName });
		}
	};

	const handleChangePhoto = () => {
		const newImagePath = "/new-profile-photo.png"; // Replace with actual upload handling
		setProfileImage(newImagePath);
		setEditedUser({ ...editedUser, profile_image_path: newImagePath });
	};

	const handleAddSkill = (skill: string) => {
		if (skill && !editedUser.skills.includes(skill)) {
			addSkill(skill);
			setEditedUser({ ...editedUser, skills: [...editedUser.skills, skill] });
			setSkillSearch("");
		}
	};

	const handleRemoveSkill = (skill: string) => {
		removeSkill(skill);
		setEditedUser({
			...editedUser,
			skills: editedUser.skills.filter((s) => s !== skill),
		});
	};

	const handleAddInterest = () => {
		if (newInterest.trim() && !editedUser.interests.includes(newInterest)) {
			addInterest(newInterest);
			setEditedUser({
				...editedUser,
				interests: [...editedUser.interests, newInterest.trim()],
			});
			setNewInterest("");
		}
	};

	const handleRemoveInterest = (interest: string) => {
		removeInterest(interest);
		setEditedUser({
			...editedUser,
			interests: editedUser.interests.filter((i) => i !== interest),
		});
	};

	// Filter skills based on search only if the search input is not empty
	const filteredSkills = skillSearch
		? validSkills
				.filter((skill) => skill.toLowerCase().includes(skillSearch.toLowerCase()))
				.filter((skill) => !editedUser.skills.includes(skill))
		: [];

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">Edit Profile</Button>
			</DialogTrigger>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Edit Profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile information here.
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-6 py-4">
					{/* Profile Picture Section */}
					<div className="flex items-center gap-4">
						<Avatar className="w-20 h-20">
							<AvatarImage src={editedUser.profile_image_path} />
							<AvatarFallback>
								{editedUser.first_name[0]}
								{editedUser.last_name[0]}
							</AvatarFallback>
						</Avatar>

						{/* File Input for Selecting Image */}
						<input
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
						/>
					</div>

					<Separator />

					{/* Basic Information */}
					<div className="grid gap-4">
						<h3 className="text-lg font-semibold">Basic Information</h3>
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="grid gap-2">
								<Label htmlFor="name">Full Name</Label>
								<div className="flex space-x-5">
									<Input
										id="firstname"
										value={editedUser.first_name}
										onChange={(e) =>
											setEditedUser({
												...editedUser,
												first_name: e.target.value,
											})
										}
									/>
									<Input
										id="lastname"
										value={editedUser.last_name}
										onChange={(e) =>
											setEditedUser({
												...editedUser,
												last_name: e.target.value,
											})
										}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Location */}
					<div className="grid gap-2">
						<Label htmlFor="location">Location</Label>
						<Input
							id="location"
							placeholder="Enter your location"
							value={editedUser.location || ""}
							onChange={(e) =>
								setEditedUser({ ...editedUser, location: e.target.value })
							}
						/>
					</div>

					{/* Bio */}
					<div className="grid gap-2">
						<Label htmlFor="bio">Bio</Label>
						<Textarea
							id="bio"
							placeholder="Write a brief bio about yourself"
							value={editedUser.bio || ""}
							onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
						/>
					</div>

					{/* Skills */}
					<div className="grid gap-4">
						<h3 className="text-lg font-semibold">Skills</h3>
						<Card>
							<CardContent className="pt-6">
								<div className="grid gap-4">
									{editedUser.skills.map((skill) => (
										<div
											key={skill}
											className="flex items-center justify-between gap-2"
										>
											<div className="flex-1">{skill}</div>
											<Button
												variant="ghost"
												size="icon"
												onClick={() => handleRemoveSkill(skill)}
											>
												<X className="w-4 h-4" />
											</Button>
										</div>
									))}

									<div className="grid gap-2">
										<Input
											placeholder="Search for a skill"
											value={skillSearch}
											onChange={(e) => setSkillSearch(e.target.value)}
										/>
										{skillSearch && (
											<div className="border rounded-lg p-2 mt-2">
												{filteredSkills.length > 0 ? (
													filteredSkills.map((skill) => (
														<div
															key={skill}
															className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100"
															onClick={() => handleAddSkill(skill)}
														>
															<span>{skill}</span>
															<Plus className="w-4 h-4" />
														</div>
													))
												) : (
													<p className="text-sm text-muted-foreground">
														No matching skills found.
													</p>
												)}
											</div>
										)}
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Interests */}
					<div className="grid gap-4">
						<h3 className="text-lg font-semibold">Interests</h3>
						<div className="flex flex-wrap gap-2">
							{editedUser.interests.map((interest) => (
								<Badge
									key={interest}
									variant="secondary"
									className="flex items-center gap-1"
								>
									{interest}
									<Button
										variant="ghost"
										size="icon"
										className="h-4 w-4 p-0 hover:bg-transparent"
										onClick={() => handleRemoveInterest(interest)}
									>
										<X className="w-3 h-3" />
									</Button>
								</Badge>
							))}
						</div>
						<div className="flex gap-2">
							<Input
								placeholder="Add a new interest"
								value={newInterest}
								onChange={(e) => setNewInterest(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										handleAddInterest();
									}
								}}
							/>
							<Button onClick={handleAddInterest} size="icon">
								<Plus className="w-4 h-4" />
							</Button>
						</div>
					</div>

					<div className="flex justify-end gap-2">
						<DialogTrigger asChild>
							<Button variant="outline">Cancel</Button>
						</DialogTrigger>
						<Button onClick={handleSave}>Save Changes</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
