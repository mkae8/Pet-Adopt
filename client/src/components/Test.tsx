
  
  const PetAddModal = () => {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setIsOpen(true)}
            className="relative overflow-hidden bg-gradient-to-r bg-inherit text-white font-semibold py-4 px-6 md:py-7 md:px-10 transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-xl focus:ring-4 focus:ring-opacity-50 group"
          >
            <div className="flex items-center gap-2">
              <Paw className="h-6 w-6" />
              <span className="relative z-10 text-[16px] md:text-[20px] font-bold">
                Үрчлүүлэх амьтны мэдээлэл оруулах
              </span>
            </div>
            <span className="absolute inset-0 bg-[#F97316] opacity-20 transform scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-50 origin-left"></span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] w-full">
          <DialogHeader>
            <DialogTitle className="text-center md:text-left">
              Амьтны мэдээлэл нэмэх
            </DialogTitle>
            <DialogDescription className="text-center md:text-left">
              Амьтны мэдээллийг оруулсаны дараа илгээх товчийг дараарай 😻
            </DialogDescription>
          </DialogHeader>
  
          {/* Form Section */}
          <div className="grid gap-4 py-4">
            {/* Category Selector */}
            <div className="flex flex-col items-center sm:items-start">
              <Select onValueChange={(value) => handleSelectChange("petCategoryId", value)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Амьтны төрөл" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="67318ef682933a1de42fa5d9">Нохой 🐕</SelectItem>
                    <SelectItem value="67318f2082933a1de42fa5db">Муур 🐈</SelectItem>
                    <SelectItem value="673575da1ecf70ca44174ba2">Шувуу 🦜</SelectItem>
                    <SelectItem value="67318fc782933a1de42fa5dd">Туулай 🐇</SelectItem>
                    <SelectItem value="67318fcc82933a1de42fa5df">Мэрэгч 🐹</SelectItem>
                    <SelectItem value="6735760a1ecf70ca44174ba6">Загас 🐠</SelectItem>
                    <SelectItem value="673576141ecf70ca44174ba8">Мөлхөгч 🐢</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
  
            {/* Responsive Input Fields */}
            <div className="grid gap-4">
              {[
                { id: "petName", label: "Амьтны нэр", type: "text", placeholder: "Амьтны нэрийг оруулна уу" },
                { id: "description", label: "Тайлбар", type: "textarea", placeholder: "Амьтныг тодорхойлно уу..." },
                { id: "age", label: "Нас", type: "number", placeholder: "Амьтны насыг жилээр оруулна уу" },
                { id: "weight", label: "Жин", type: "text", placeholder: "Жинг кг-аар оруулна уу" },
                { id: "location", label: "Байршил", type: "text", placeholder: "Байршлыг оруулна уу" },
              ].map((field) => (
                <div key={field.id} className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor={field.id} className="text-center sm:text-right">
                    {field.label}
                  </Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      id={field.id}
                      value={formData[field.id]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="col-span-3 w-full"
                    />
                  ) : (
                    <Input
                      id={field.id}
                      type={field.type}
                      value={formData[field.id]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="col-span-3 w-full"
                    />
                  )}
                </div>
              ))}
            </div>
  
            {/* Responsive Dropdown Selects */}
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="sex" className="text-center sm:text-right">
                Хүйс
              </Label>
              <Select onValueChange={(value) => handleSelectChange("sex", value)}>
                <SelectTrigger className="col-span-3 w-full">
                  <SelectValue placeholder="Хүйс сонгоно уу" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Эр</SelectItem>
                  <SelectItem value="Female">Эм</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Add more similar responsive Select inputs if needed */}
          </div>
  
          <DialogFooter className="flex justify-center sm:justify-end">
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full sm:w-auto relative ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {loading ? "Илгээж байна..." : "Мэдээлэл илгээх"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  